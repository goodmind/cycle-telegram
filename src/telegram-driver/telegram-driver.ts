import { Observable, Subject, Observable as $ } from 'rxjs'
import { T, F, tryCatch, last, always, and, is, identity, mapObjIndexed, both, invoker, cond } from 'ramda'
import { isType, Type } from 'tcomb'

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
import { TcombUpdate, TcombUpdatesState, TcombWebhookResponse } from '.'
import { isWebhookResponse, adapt } from '../helpers'

let makeEventsSelector =
  ({
    message,
    channelPost,
    editedMessage,
    editedChannelPost,
    inlineQuery,
    chosenInlineResult,
    callbackQuery
  }: DriverSources) =>
    (eventName: EventNames): Observable<TcombUpdate> =>
      ({
        'message': message.share(),
        'channel_post': channelPost.share(),
        'edited_channel_post': editedChannelPost.share(),
        'edited_message': editedMessage.share(),
        'inline_query': inlineQuery.share(),
        'chosen_inline_result': chosenInlineResult.share(),
        'callback_query': callbackQuery.share()
      })[eventName]

function makeResponsesSelector (res: Observable<any>) {
  const emptyType = Object.assign(identity.bind({}), { is: () => true })
  const filter = (invoker as any)(1, 'filter')
  const tryFilter = (x: any) => filter((tryCatch as any)(x, F))

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
        tryFilter(responseFilter)],
      [
        always(and(is(String, method), !responseType)),
        tryFilter(both(methodFilter, methodRFilter))],
      [
        always(and(isType(responseType), is(String, method))),
        tryFilter(both(methodFilter, requestFilter))],
      [T, identity]
    ])($.zip(res, res.switch())) as Observable<[any, any]>

    return selectedRes.map<any, T>(last)
  }
}

let handleWebhook = (
  token: Token,
  request: Observable<Observable<TcombWebhookResponse>>,
  proxy: Subject<TcombUpdate[]>
) => request
  .mergeAll()
  .filter(WebhookResponse.is)
  .pluck('update')
  .subscribe(
    (upd: TcombUpdate) => proxy.next([upd]),
    (err: any) => console.error('request error: ', err))

let handleRequest =
  (token: Token, request: Observable<Observable<DriverSink>>) => request
    .mergeAll()
    .filter(Request.is)
    .flatMap(({
      method,
      multipart,
      returnType,
      options: query
    }) => makeAPIRequest({returnType, token, method, query}, multipart))

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
    .do(null, (err: any) => {
      console.error('updates error: ', err)
      console.warn('Waiting 30 seconds before retry...')
    })
    .catch(() => proxyUpdates.delay(30000))
    .publishReplay(null, 1)

  let sources = makeSources(updates)
  let disposable = updates.connect()

  function telegramDriver (request: Observable<Observable<DriverSink>>): DriverExecution {
    if (isWebhookResponse(request, options)) {
      handleWebhook(token, request, proxyWebHook)
    }

    let responses = handleRequest(token, request).share()
    responses.subscribe(null, (err: any) => console.error('request error: ', err))

    return Object.assign(
      {
        token,
        dispose: () => disposable.unsubscribe()
      },
      mapObjIndexed(adapt, {
        events: makeEventsSelector(sources),
        selectResponses: makeResponsesSelector(responses),
        responses: responses.switch(),
        updates
      })) as DriverExecution
  }

  return (req: any) => telegramDriver($.from(req))
}
