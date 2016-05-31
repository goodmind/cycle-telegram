import Rx from 'rx'
import RxAdapter from '@cycle/rx-adapter'

import { prop, mergeAll } from 'ramda'
import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request, WebhookResponse } from '../types'

function makeEventsSelector (sources, adapt) {
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
    let rxStream = Rx.Observable.case(
      () => eventName,
      mergeAll([
        messageSources,
        inlineQuerySources,
        callbackQuerySources
      ]))

    return adapt(rxStream)
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

let adapter = runSA => stream => runSA ?
  runSA.adapt(stream, RxAdapter.streamSubscribe)
  : stream

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

  function telegramDriver (request, runSA) {
    let adapt = adapter(runSA)
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
      observable: adapt(updates),
      responses: adapt(newRequest), // handle request
      events: makeEventsSelector(sources, adapt),
      dispose: () => disposable.dispose()
    }
  }

  telegramDriver.streamAdapter = RxAdapter

  return telegramDriver
}
