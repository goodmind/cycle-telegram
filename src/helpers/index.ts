import { Observable } from 'rxjs'
import xs from 'xstream'
import { adapt as _adapt } from '@cycle/run/lib/adapt'
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

export const convertStream =
  (stream: any) => _adapt(xs.from(stream) as any)

export const adapt: (streamOrFunc: Observable<any> | StreamFunction) => any = ifElse(
  isObservable,
  convertStream,
  ifElse(
    is(Function),
    func => (...args: any[]) => convertStream(func(...args)),
    identity))

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
