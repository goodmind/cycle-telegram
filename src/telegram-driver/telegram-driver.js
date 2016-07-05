import { Observable as $, Subject } from 'rx'
import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request, WebhookResponse } from '../types'

function makeEventsSelector (sources) {
  return function events (eventName) {
    let sources = {
      'message': sources.message.share(),
      'inline_query': sources.inlineQuery.share(),
      'chosen_inline_result': sources.chosenInlineResult.share(),
      'callback_query': sources.callbackQuery.share()
    }

    return $.case(
      () => eventName,
      sources)
  }
}

let handleWebhook = (token, request, action) => {
  return request.mergeAll()
    .filter(WebhookResponse.is)
    .pluck('update')
    .subscribe(
      upd => action.onNext([upd]),
      err => console.error('request error: ', err))
}

let makeRequest = (token, request) => {
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
  let action = new Subject()

  if (options.webhook) {
    proxy = makeWebHook(state, action)
  }

  let updates = proxy
    .doOnError(err => {
      console.error('updates error: ', err)
      console.warn('Waiting 30 seconds before retry...')
    })
    .catch(proxy.delay(30000))
    .replay(null, 1)

  let sources = makeSources(updates)
  let disposable = updates.connect()

  return function telegramDriver (request) {
    if (options.webhook) {
      handleWebhook(token, request, action)
    }

    let newRequest = makeRequest(token, request)
      .share()

    newRequest.subscribeOnError(err => console.error('request error: ', err))

    return {
      token: token,
      observable: updates,
      responses: newRequest,
      events: makeEventsSelector(sources),
      dispose: () => disposable.dispose()
    }
  }
}
