import RxAdapter from '@cycle/rx-adapter'
import { StreamAdapter } from '@cycle/base'
import { Observable, Subject, Observable as $ } from 'rx'
import { T, last, always, and, is, identity, mapObjIndexed, both, invoker, cond } from 'ramda'
import { isType, Type } from 'tcomb'

import {
  DriverOptions,
  DriverExecution,
  DriverSources,
  DriverSink,
  Token
} from '../interfaces'
import { makeSources, makeUpdates, makeWebHook } from './sources'
import { makeAPIRequest } from './api-request'
import { Request, WebhookResponse } from '.'
import { TcombUpdate, TcombUpdatesState, TcombWebhookResponse, TcombRequest } from '.'
import { adapter, isWebhookResponse, convertStream } from '../helpers'

function makeEventsSelector ({message, inlineQuery, chosenInlineResult, callbackQuery}: DriverSources) {
  return function events (eventName: string): Observable<TcombUpdate> {
    return $.case(() => eventName, {
      'message': message.share(),
      'inline_query': inlineQuery.share(),
      'chosen_inline_result': chosenInlineResult.share(),
      'callback_query': callbackQuery.share()
    })
  }
}

function makeResponsesSelector (res: Observable<any>) {
  const emptyType = Object.assign(identity.bind({}), { is: () => true })
  const filter = (invoker as any)(1, 'filter')

  return function responses<T, R> ({
    responseType,
    method
  }: { responseType?: Type<R>, method?: string } = {}): Observable<T> {
    const responseFilter = ([_, v]: any) => responseType.is(responseType(v))
    const methodRFilter = ([{ request: { returnType: Type = emptyType } }, v]: any) => Type.is(Type(v))
    const requestFilter = ([{ request: { returnType: Type = responseType } }, v]: any) => Type.is(Type(v))
    const methodFilter = ([{ request: r }]: any) => r.method === method
    let selectedRes = cond([
      [
        always(and(isType(responseType), !method)),
        filter(responseFilter)],
      [
        always(and(is(String, method), !responseType)),
        filter(both(methodFilter, methodRFilter))],
      [
        always(and(isType(responseType), is(String, method))),
        filter(both(methodFilter, requestFilter))],
      [T, identity]
    ])($.zip(res, res.switch())) as Observable<[any, any]>

    return selectedRes.map<T>(last)
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
      returnType,
      options: query
    }) => makeAPIRequest({returnType, token, method, query}, multipart))
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
  let proxyWebHook = new Subject<TcombUpdate[]>()

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
        selectResponses: makeResponsesSelector(responses),
        responses: responses.switch(),
        updates
      })) as DriverExecution
  }

  (telegramDriver as any).streamAdapter = RxAdapter

  return telegramDriver
}
