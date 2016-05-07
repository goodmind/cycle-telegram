import Rx from 'rx'
import chalk from 'chalk'

import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request } from './types/types'

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

export function makeTelegramDriver (token, webHook) {
  let proxy = webHook ? makeWebHook(token, webHook) : makeUpdates(token)
  let updates = proxy
    .doOnError(err => console.log('Updates Error', err))
    .replay(null, 1)

  let sources = makeSources(updates)
  let disposable = updates.connect()

  return function telegramDriver (request) {
    // pass request
    request
      .mergeAll()
      .filter(Request.is)
      .flatMap(({method, options: query}) => makeAPIRequest({token, method, query}))
      .subscribe(
        msg => console.log(chalk.bold('sent message')),
        err => console.log('onError', err)
      )

    // return interface
    return {
      observable: updates,
      events: makeEventsSelector(sources),
      dispose: () => disposable.dispose()
    }
  }
}
