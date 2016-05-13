import Rx from 'rx'

import { curryN, reduce, propIs } from 'ramda'
import { makeAPIRequest } from './api-request'

import { UpdatesState, Message, InlineQuery, ChosenInlineResult } from '../types'
import { CallbackQuery } from '../types/keyboard-types'

let max = curryN(3, (property, acc, current) => current[property] > acc ? current[property] : acc)
let makeUpdatesResolver = curryN(2, (token, offset) => makeAPIRequest({
  httpMethod: 'GET',
  token,
  method: 'getUpdates',
  query: { offset }
}))

export function makeUpdates (token) {
  let resolve = makeUpdatesResolver(token)
  let initialState = UpdatesState({
    startDate: Date.now(),
    offset: 0,
    updates: []
  })

  return Rx.Observable.return(initialState).expand(({offset}) => resolve(offset)
    .combineLatest(Rx.Observable.interval(100).take(1), (updates, _) => UpdatesState({
      startDate: initialState.startDate,
      offset: reduce(max('update_id'), 0, updates) + 1,
      updates
    })))
}

export function makeWebHook (token, action) {
  let webHookUpdates = action.share()
  let initialState = UpdatesState({
    startDate: Date.now(),
    offset: 0,
    updates: []
  })

  return Rx.Observable.concat(
    Rx.Observable.just(initialState),
    webHookUpdates.map((updates) => UpdatesState({
      startDate: initialState.startDate,
      offset: reduce(max('update_id'), 0, updates) + 1,
      updates
    })))
    .share()
}

export function makeSources (state) {
  let updates = state
    .pluck('updates')
    .map(u => Rx.Observable.fromArray(u))
    .switch()
    .share()

  let startDate = state
    .pluck('startDate')
    .share()

  return {
    message: Rx.Observable.zip(updates, startDate)
      .filter(([update, startDate]) => Message.is(update.message))
      .filter(([update, startDate]) => (update.message.date * 1000) >= startDate)
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
