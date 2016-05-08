import Rx from 'rx'

import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request } from '../types'

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

let handleRequest = (token, request) => {
  return request
    .mergeAll()
    .filter(Request.is)
    .flatMap(({method, options: query}) => makeAPIRequest({token, method, query}))
    .doOnError(err => console.log('request error: ', err))
    .subscribe()
}

export function makeTelegramDriver (token, webHook) {
  let proxy = webHook ? makeWebHook(token, webHook) : makeUpdates(token)
  let updates = proxy
    .doOnError(err => console.log('updates error: ', err))
    .replay(null, 1)

  let sources = makeSources(updates)
  let disposable = updates.connect()

  return function telegramDriver (request) {
    // pass request
    handleRequest(token, request)

    // return interface
    return {
      observable: updates,
      events: makeEventsSelector(sources),
      dispose: () => disposable.dispose()
    }
  }
}
