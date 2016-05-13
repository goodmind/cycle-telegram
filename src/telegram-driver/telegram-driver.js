import Rx from 'rx'

import { prop } from 'ramda'
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
      Object.assign({}, messageSources, inlineQuerySources, callbackQuerySources)
    )
  }
}

let handleWebhook = (token, request, action) => {
  return request.mergeAll()
    .filter(WebhookResponse.is)
    .map(prop('update'))
    .subscribe(
      upd => action.onNext([upd]),
      err => console.error('request error: ', err)
    )
}

let handleRequest = (token, request) => {
  return request.mergeAll()
    .filter(Request.is)
    .flatMap(({method, options: query}) => makeAPIRequest({token, method, query}).catch(Rx.Observable.empty()))
    .subscribeOnError(
      err => console.error('request error: ', err)
    )
}

export function makeTelegramDriver (token, options = {}) {
  let proxy = makeUpdates(token)
  let action = new Rx.Subject()
  if (options.webhook) {
    proxy = makeWebHook(token, action)
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
    // handle request
    handleRequest(token, request)

    // return interface
    return {
      token: token,
      observable: updates,
      events: makeEventsSelector(sources),
      dispose: () => disposable.dispose()
    }
  }
}
