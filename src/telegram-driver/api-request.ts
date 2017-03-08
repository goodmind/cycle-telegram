import { TelegramAPIRequest, TelegramAPIResponse, TelegramAPIResponseResult, TelegramAPIError } from '../interfaces'

import { Observable, Observer, Observable as $ } from 'rxjs'
import * as request from 'superagent'
import { Request, Response } from 'superagent'
import { propOr, last, values, pipe, mapObjIndexed, curryN, ifElse } from 'ramda'

let fromSuperagent =
  (request: Request): Observable<any> => $.create((obs: Observer<Response>): () => void => {
    request.end((err, res) => {
      if (err) {
        obs.error(err)
      } else {
        obs.next(res)
      }
      obs.complete()
    })

  return () => request.abort()
})

let transformReq = curryN(2, (req: Request, multipart: boolean) => ifElse(
  () => multipart,
  pipe<any, any, any, any>(
    mapObjIndexed((v: any, k: string) => v
      ? req[propOr(false, 'path', v) ? 'attach' : 'field'](k, v)
      : req),
    values,
    last
  ),
  req.send.bind(req)
))

export function makeAPIRequest (
  {
    token,
    method,
    query,
    httpMethod = 'POST'
  }: TelegramAPIRequest,
  multipart = false
): Observable<TelegramAPIResponseResult | TelegramAPIError> {
  let endpoint = `https://api.telegram.org/bot${token}`
  let url = `${endpoint}/${method}`
  let req = transformReq(request(httpMethod, url).redirects(0), multipart)(query)

  return fromSuperagent(req)
    .catch(e => $.throw(e instanceof Error ? e : new Error(e)))
    .map<any, TelegramAPIResponse>(res => res.body)
    .map(body => body.ok
      ? $.of(body.result)
      : $.throw(body))
    .switch()
}
