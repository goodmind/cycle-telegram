import Rx from 'rx'
import chalk from 'chalk'

import { reduce, propIs } from 'ramda'
import { makeAPIRequest } from './api-request'

import { UpdatesState, Message, InlineQuery, ChosenInlineResult } from './types/types'
import { CallbackQuery } from './types/keyboard-types'

let max = (property) => (acc, current) => current[property] > acc ? current[property] : acc

let makeUpdatesResolver = (token) => (offset) => makeAPIRequest({
  httpMethod: 'GET',
  token,
  method: 'getUpdates',
  query: { offset }
}).flatMapLatest(res => Rx.Observable.fromArray(res))

export function makeUpdates (token) {
  let resolve = makeUpdatesResolver(token)
  let initialState = UpdatesState({
    startDate: Date.now(),
    offset: 0,
    updates: []
  })

  console.log(chalk.green(`Uptime is ${new Date(initialState.startDate)}`))

  return Rx.Observable.return(initialState).expand(({offset}) => resolve(offset)
    .toArray()
    .combineLatest(Rx.Observable.interval(100).take(1), (updates, _) => UpdatesState({
      startDate: initialState.startDate,
      offset: reduce(max('update_id'), 0, updates) + 1,
      updates
    })))
}

export function makeWebHook (token, webHook) {
  return Rx.Observable.create((obs) => webHook(obs))
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
