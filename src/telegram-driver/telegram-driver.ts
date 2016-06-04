import { Observable, Subject, Observable as $ } from 'rx'
import {
  TelegramDriverOptions,
  TelegramDriverExecution,
  TelegramDriverSources,
  TelegramDriverState,
  TelegramDriverSink,
  Update,
  Token
} from '../interfaces';

import { prop, mergeAll } from 'ramda'
import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request, WebhookResponse } from './.'

function makeEventsSelector (sources: TelegramDriverSources) {
  return function events (eventName: string): Observable<Update> {
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
    return $.case(
      () => eventName,
      mergeAll([messageSources, inlineQuerySources, callbackQuerySources]))
  }
}

let handleWebhook = (token: Token, request: Observable, action: Subject) => {
  return request.mergeAll()
    .filter(WebhookResponse.is)
    .map(prop('update'))
    .subscribe(
      upd => action.onNext([upd]),
      err => console.error('request error: ', err))
}

let handleRequest = (token: Token, request: Observable): Observable => {
  return request.mergeAll()
    .filter(Request.is)
    .flatMap(({
      method,
      options: query
    }) => makeAPIRequest({token, method, query}))
}

export function makeTelegramDriver (token: Token, options?: TelegramDriverOptions = {}): Function {
  let state: TelegramDriverState = {
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

  return function telegramDriver (request: Observable<TelegramDriverSink>): TelegramDriverExecution {
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
