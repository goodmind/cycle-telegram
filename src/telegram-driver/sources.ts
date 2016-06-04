import { Observable, Subject, Observable as $ } from 'rx'
import { Token, TelegramDriverState, TelegramDriverSources } from '../interfaces'

import { curryN, reduce, propIs } from 'ramda'
import { makeAPIRequest } from './api-request'
import {
  UpdatesState,
  Message,
  InlineQuery,
  ChosenInlineResult
} from '../runtime-types'

import { CallbackQuery } from '../runtime-types/types'

let max = curryN(3,
  (property, acc, current) => current[property] > acc ? current[property] : acc)

let makeUpdatesResolver = curryN(2, (token: Token, offset): Observable => makeAPIRequest({
  token,
  method: 'getUpdates',
  query: { offset, timeout: 60000 }
}))

export function makeUpdates (initialState: TelegramDriverState, token: Token): Observable<TelegramDriverState> {
  UpdatesState(initialState)

  let resolve = makeUpdatesResolver(token)

  return $.return(initialState).expand(({offset}) => resolve(offset)
    .combineLatest(
      $.interval(500).take(1),
      (updates, _) => UpdatesState({
        startDate: initialState.startDate,
        offset: reduce(max('update_id'), 0, updates) + 1,
        updates
      })))
}

export function makeWebHook (initialState: TelegramDriverState, action: Subject) {
  UpdatesState(initialState)

  let webHookUpdates = action.share()

  return $.concat(
    $.just(initialState),
    webHookUpdates.map((updates) => UpdatesState({
      startDate: initialState.startDate,
      offset: reduce(max('update_id'), 0, updates) + 1,
      updates
    })))
    .share()
}

export function makeSources (state: Observable<TelegramDriverState>): TelegramDriverSources {
  let updates = state
    .pluck('updates')
    .map(u => $.fromArray(u))
    .switch()
    .share()

  let startDate = state
    .pluck('startDate')
    .share()

  return {
    message: $.zip(updates, startDate)
      .filter(([update, startDate]) => Message.is(update.message))
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
