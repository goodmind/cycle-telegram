import { Observable, Subject, Observable as $ } from 'rx'
import { unary, curryN, reduce, propIs, pipe, head } from 'ramda'
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

let messageLife =
  ([update, startDate]: [TcombUpdate, number]) =>
    (startDate - (update.message || update.channel_post || update.edited_channel_post).date * 1000) <= 30000

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

  return $.return(initialState).expand(({offset}) => resolve(offset)
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
    $.just(initialState),
    webHookUpdates.map((updates: TcombUpdate[]) => UpdatesState({
      startDate: initialState.startDate,
      offset: reduce(max('update_id'), 0, updates) + 1,
      updates
    })))
    .share()
}

export function makeSources (state: Observable<TcombUpdatesState>): DriverSources {
  let updates = state
    .pluck<TcombUpdate[]>('updates')
    .map(unary($.from))
    .switch()
    .share()

  let startDate = state
    .pluck('startDate')
    .share()

  let messageLike =
    (kind: 'message' | 'edited_message' | 'channel_post' | 'edited_channel_post') =>
      $.zip(updates, startDate)
        .filter(pipe(head, propIs(Message, kind)))
        .filter(messageLife)
        .map<TcombUpdate>(head)
        .share()

  return {
    message: messageLike('message'),
    channelPost: messageLike('channel_post'),
    editedChannelPost: messageLike('edited_channel_post'),

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
