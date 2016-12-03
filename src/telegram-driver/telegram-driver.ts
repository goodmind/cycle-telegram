import RxAdapter from '@cycle/rx-adapter'
import { StreamAdapter } from '@cycle/base'
import { Observable, Subject, Observable as $ } from 'rx'
import { mapObjIndexed } from 'ramda'

import {
  DriverOptions,
  DriverExecution,
  DriverSources,
  DriverSink,
  Token, EventNames
} from '../interfaces'
import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request, WebhookResponse } from '.'
import { TcombUpdate, TcombUpdatesState, TcombWebhookResponse, TcombRequest } from '.'
import { adapter, isWebhookResponse, convertStream } from '../helpers'

function makeEventsSelector ({message, channelPost, inlineQuery, chosenInlineResult, callbackQuery}: DriverSources) {
  return function events (eventName: EventNames): Observable<TcombUpdate> {
    return $.case(() => eventName, {
      'message': message.share(),
      'channel_post': channelPost.share(),
      'inline_query': inlineQuery.share(),
      'chosen_inline_result': chosenInlineResult.share(),
      'callback_query': callbackQuery.share()
    })
  }
}

let handleWebhook = (
  token: Token,
  request: Observable<Observable<TcombWebhookResponse>>,
  proxy: Subject<TcombUpdate[]>
) => {
  return request.mergeAll()
    .filter(WebhookResponse.is)
    .pluck('update')
    .subscribe(
      (upd: TcombUpdate) => proxy.onNext([upd]),
      (err: any) => console.error('request error: ', err))
}

let handleRequest = (token: Token, request: Observable<Observable<TcombRequest>>) => {
  return request.mergeAll()
    .filter(Request.is)
    .flatMap(({
      method,
      multipart,
      options: query
    }) => makeAPIRequest({token, method, query}, multipart))
}

export function makeTelegramDriver (
  token: Token,
  options: DriverOptions = {}
) {
  let state: TcombUpdatesState = {
    startDate: options.startDate || Date.now(),
    offset: 0,
    updates: []
  }

  let proxyUpdates = options.skipUpdates ? $.never<TcombUpdatesState>() : makeUpdates(state, token)
  let proxyWebHook = new Subject<any>()

  if (options.webhook) {
    proxyUpdates = makeWebHook(state, proxyWebHook)
  }

  let updates = proxyUpdates
    .doOnError((err: any) => {
      console.error('updates error: ', err)
      console.warn('Waiting 30 seconds before retry...')
    })
    .catch(proxyUpdates.delay(30000))
    .replay(null, 1)

  let sources = makeSources(updates)
  let disposable = updates.connect()

  function telegramDriver (sourceRequest: Observable<Observable<DriverSink>>, runSA: StreamAdapter): DriverExecution {
    let adapt = adapter(runSA)
    let request = sourceRequest.map(x => convertStream(x, runSA, RxAdapter))

    if (isWebhookResponse(request, options)) {
      handleWebhook(token, request, proxyWebHook)
    }

    let responses = handleRequest(token, request as Observable<Observable<TcombRequest>>).share()
    responses.subscribeOnError((err: any) => console.error('request error: ', err))

    return Object.assign(
      {
        token,
        dispose: () => disposable.dispose()
      },
      mapObjIndexed(adapt, {
        events: makeEventsSelector(sources),
        updates,
        responses
      })) as DriverExecution
  }

  (telegramDriver as any).streamAdapter = RxAdapter

  return telegramDriver
}
