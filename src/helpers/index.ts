import { StreamAdapter } from '@cycle/base'
import RxJSAdapter from '@cycle/rxjs-adapter'
import { Observable } from 'rxjs'
import {
  TcombWebhookResponse,
  // tslint:disable-next-line 
  TcombUpdate
} from '../runtime-types'
import { PartialUpdate } from '../interfaces'
import {
  identity, curryN, compose, evolve,
  pickAll, chain, keys, ifElse, is
} from 'ramda'

export * from './entities'

export function isWebhookResponse (
  request: Observable<Observable<any>>,
  options: any
): request is Observable<Observable<TcombWebhookResponse>> {
  return options.webhook
}

export function isObservable<T> (o: any): o is Observable<T> {
  return o && is(Function, o.subscribe)
}

export type StreamFunction = (...args: any[]) => Observable<any>

export function convertStream (stream: any, sourceSA: StreamAdapter, targetSA: StreamAdapter) {
  return targetSA.isValidStream(stream)
    ? stream
    : targetSA.adapt(stream, sourceSA.streamSubscribe)
}

export function adapter (runSA: StreamAdapter) {
  let adapt: (streamOrFunc: Observable<any> | StreamFunction) => any = ifElse(
    isObservable,
    adaptStream,
    ifElse(
      is(Function),
      adaptFunction,
      identity))

  function adaptStream (stream: Observable<any>) {
    return convertStream(stream, RxJSAdapter, runSA)
  }

  function adaptFunction (func: StreamFunction) {
    return (...args: any[]) => adaptStream(func(...args))
  }

  return adapt
}

export function messageCase (update: PartialUpdate) {
  if (update.channel_post) {
    return { ...update, message: update.channel_post }
  }
  if (update.edited_channel_post) {
    return { ...update, message: update.edited_channel_post }
  }
  if (update.edited_message) {
    return { ...update, message: update.edited_message }
  }
  return update
}

export let defaults = curryN(2, (transformations, obj) => compose<any, any, any, any>(
  evolve(transformations),
  pickAll)(
    chain(keys, [transformations, obj]),
    obj))
