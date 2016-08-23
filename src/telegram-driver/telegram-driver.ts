import { Observable, Subject, Observable as $ } from 'rx'
import {
  TelegramDriverOptions,
  TelegramDriverExecution,
  TelegramDriverSources,
  TelegramDriverState,
  TelegramDriverSink,
  Update,
  Token
} from '../interfaces'

import { prop } from 'ramda'
import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'

import { Request, WebhookResponse } from '.'
import { TcombWebhookResponse, TcombRequest } from '.'

function isWebhookResponse (
  request: Observable<Observable<any>>,
  options: any
): request is Observable<Observable<TcombWebhookResponse>> {
  return options.webhook
}

function makeEventsSelector (sources: TelegramDriverSources) {
  return function events (eventName: string): Observable<Update> {
    // return interface
    return $.case(() => eventName, {
      'message': sources.message.share(),
      'inline_query': sources.inlineQuery.share(),
      'chosen_inline_result': sources.chosenInlineResult.share(),
      'callback_query': sources.callbackQuery.share()
    })
  }
}

let handleWebhook = (token: Token, request: Observable<Observable<TcombWebhookResponse>>, action: Subject<any>) => {
  return request.mergeAll()
    .filter(WebhookResponse.is)
    .map(prop('update'))
    .subscribe(
      (upd: Update) => action.onNext([upd]),
      (err: any) => console.error('request error: ', err))
}

let handleRequest = (token: Token, request: Observable<Observable<TcombRequest>>): Observable<any> => {
  return request.mergeAll()
    .filter(Request.is)
    .flatMap(({
      method,
      options: query
    }) => makeAPIRequest({token, method, query}))
}

export function makeTelegramDriver (
  token: Token,
  options: TelegramDriverOptions = {}
): (request: Observable<Observable<TelegramDriverSink>>) => TelegramDriverExecution {
  let state: TelegramDriverState = {
    startDate: options.startDate || Date.now(),
    offset: 0,
    updates: []
  }

  let proxy = makeUpdates(state, token)
  let action = new Subject<any>()

  if (options.webhook) {
    proxy = makeWebHook(state, action)
  }

  let updates = proxy
    .doOnError((err: any) => {
      console.error('updates error: ', err)
      console.warn('Waiting 30 seconds before retry...')
    })
    .catch(proxy.delay(30000))
    .replay(null, 1)

  let sources = makeSources(updates)
  let disposable = updates.connect()

  return function telegramDriver (request) {
    // pass request
    if (isWebhookResponse(request, options)) {
      // handle webhook
      handleWebhook(token, request, action)
    }

    let newRequest = handleRequest(token, request as Observable<Observable<TcombRequest>>)
      .share()

    newRequest.subscribeOnError((err: any) => console.error('request error: ', err))

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
