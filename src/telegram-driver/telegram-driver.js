import Rx from 'rx'

import { prop, merge } from 'ramda'
import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request, WebhookResponse } from '../types'

function makeEventsSelector (sources) {
  return function events (eventName) {
    let messageSources = {
      'message': sources.message.share()
    }

    let inlineQuerySources = {
      'inline_query': sources.inlineQuery.share(),
      'chosen_inline_result': sources.chosenInlineResult.share()
    }

    let callbackQuerySources = {
      'callback_query': sources.callbackQuery.share()
    }

    // return interface
    return Rx.Observable.case(
      () => eventName,
      merge({}, messageSources, inlineQuerySources, callbackQuerySources))
  }
}

let handleWebhook = (token, request, action) => {
  return request.mergeAll()
    .filter(WebhookResponse.is)
    .map(prop('update'))
    .subscribe(
      upd => action.onNext([upd]),
      err => console.error('request error: ', err))
}

let handleRequest = (token, request) => {
  return request.mergeAll()
    .filter(Request.is)
    .flatMap(({
      method,
      options: query
    }) => makeAPIRequest({token, method, query}))
}

export function makeTelegramDriver (token, options = {}) {
  let state = {
    startDate: options.startDate || Date.now(),
    offset: 0,
    updates: []
  }

  let proxy = makeUpdates(state, token)
  let action = new Rx.Subject()

  if (options.webhook) {
    proxy = makeWebHook(state, action)
  }

  let updates = proxy
    .doOnError(err => console.error('updates error: ', err))
    .replay(null, 1)

  let sources = makeSources(updates)
  let disposable = updates.connect()

  return function telegramDriver (request) {
    // pass request
    if (options.webhook) {
      // handle webhook
      handleWebhook(token, request, action)
    }

    let newRequest = handleRequest(token, request)
      .share()

    newRequest.subscribeOnError(err => console.error('request error: ', err))

    // return interface
    return {
      token: token,
      observable: updates,
      responses: newRequest, // handle request
      events: makeEventsSelector(sources),
      dispose: () => disposable.dispose()
    }
  }
}
