import RxAdapter from '@cycle/rx-adapter'

import { Observable as $, Subject } from 'rx'
import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request, WebhookResponse } from '../types'

function makeEventsSelector ({
  message,
  inlineQuery,
  chosenInlineResult,
  callbackQuery
}, adapt) {
  return function events (eventName) {
    let rxStream = $.case(() => eventName, {
      'message': message.share(),
      'inline_query': inlineQuery.share(),
      'chosen_inline_result': chosenInlineResult.share(),
      'callback_query': callbackQuery.share()
    })

    return adapt(rxStream)
  }
}

let handleWebhook = (token, request, proxy) => {
  return request.mergeAll()
    .filter(WebhookResponse.is)
    .pluck('update')
    .subscribe(
      upd => proxy.onNext([upd]),
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

let adapter = runSA => stream => runSA
  ? runSA.adapt(stream, RxAdapter.streamSubscribe) : stream

export function makeTelegramDriver (token, options = {}) {
  let state = {
    startDate: options.startDate || Date.now(),
    offset: 0,
    updates: []
  }

  let proxyUpdates = makeUpdates(state, token)
  let proxyWebHook = new Subject()

  if (options.webhook) {
    proxyUpdates = makeWebHook(state, proxyWebHook)
  }

  let updates = proxyUpdates
    .doOnError(err => {
      console.error('updates error: ', err)
      console.warn('Waiting 30 seconds before retry...')
    })
    .catch(proxyUpdates.delay(30000))
    .replay(null, 1)

  let sources = makeSources(updates)
  let disposable = updates.connect()

  function telegramDriver (request, runSA) {
    let adapt = adapter(runSA)

    if (options.webhook) {
      handleWebhook(token, request, proxyWebHook)
    }

    let responses = handleRequest(token, request)
      .share()

    responses.subscribeOnError(err => console.error('request error: ', err))

    return {
      token,
      observable: adapt(updates),
      responses: adapt(newRequest), // handle request
      events: makeEventsSelector(sources, adapt),
      dispose: () => disposable.dispose()
    }
  }

  telegramDriver.streamAdapter = RxAdapter

  return telegramDriver
}
