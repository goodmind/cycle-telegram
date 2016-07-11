import { Observable as $, Subject } from 'rx'
import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request, WebhookResponse } from '../types'

function makeEventsSelector ({
  message,
  inlineQuery,
  chosenInlineResult,
  callbackQuery
}) {
  return function events (eventName) {
    return $.case(() => eventName, {
      'message': message.share(),
      'inline_query': inlineQuery.share(),
      'chosen_inline_result': chosenInlineResult.share(),
      'callback_query': callbackQuery.share()
    })
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

  return function telegramDriver (request) {
    if (options.webhook) {
      handleWebhook(token, request, proxyWebHook)
    }

    let responses = handleRequest(token, request)
      .share()

    responses.subscribeOnError(err => console.error('request error: ', err))

    return {
      token,
      updates,
      responses,
      events: makeEventsSelector(sources),
      dispose: () => disposable.dispose()
    }
  }
}
