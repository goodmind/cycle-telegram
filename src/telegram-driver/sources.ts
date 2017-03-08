import { Observable, Subject, Observable as $ } from 'rxjs'
import { curryN, reduce, propIs } from 'ramda'
import { makeAPIRequest } from './api-request'
import { Token, DriverSources } from '../interfaces'
import {
  UpdatesState,
  Message,
  InlineQuery,
  ChosenInlineResult,
  CallbackQuery,
  TcombUpdate,
  TcombUpdatesState
} from '../runtime-types/types'

let max =
  curryN(3, (property: any, acc: any, current: any) =>
    current[property] > acc ? current[property] : acc)

let makeUpdatesResolver =
  curryN(2, (token: Token, offset: number) => makeAPIRequest({
    token,
    method: 'getUpdates',
    query: { offset, timeout: 60000 }
  }))

export function makeUpdates (initialState: TcombUpdatesState, token: Token): Observable<TcombUpdatesState> {
  UpdatesState(initialState)

  let resolve = makeUpdatesResolver(token)

  return $.of(initialState).expand(({offset}) => resolve(offset)
    .combineLatest(
      $.interval(500).take(1),
      (updates: TcombUpdate[], _: any) => UpdatesState({
        startDate: initialState.startDate,
        offset: reduce(max('update_id'), 0, updates) + 1,
        updates
      })))
}

export function makeWebHook (
  initialState: TcombUpdatesState,
  action: Subject<TcombUpdate[]>
): Observable<TcombUpdatesState> {
  UpdatesState(initialState)

  let webHookUpdates = action.share()

  return $.concat<TcombUpdatesState>(
    $.of(initialState),
    webHookUpdates.map((updates: TcombUpdate[]) => UpdatesState({
      startDate: initialState.startDate,
      offset: reduce(max('update_id'), 0, updates) + 1,
      updates
    })))
    .share()
}

export function makeSources (state: Observable<TcombUpdatesState>): DriverSources {
  let updates = state
    .pluck('updates')
    .map((u: TcombUpdate[]) => $.from(u))
    .switch()
    .share()

  let startDate = state
    .pluck<TcombUpdatesState, number>('startDate')
    .share()

  return {
    message: $.zip(updates, startDate)
      .filter(([update]) => Message.is(update.message))
      .filter(([update, startDate]) => (startDate - update.message.date * 1000) <= 30000)
      .map(([update]) => update)
      .share(),

    inlineQuery: updates
      .filter(propIs(InlineQuery, 'inline_query'))
      .share(),

    chosenInlineResult: updates
      .filter(propIs(ChosenInlineResult, 'chosen_inline_result'))
      .share(),

    callbackQuery: updates
      .filter(propIs(CallbackQuery, 'callback_query'))
      .share()
  }
}
