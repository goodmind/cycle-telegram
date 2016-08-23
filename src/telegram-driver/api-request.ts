import { TelegramAPIRequest, TelegramAPIResponse, TelegramAPIResponseResult, TelegramAPIError } from '../interfaces'
import { Observable, Observer, Observable as $ } from 'rx'

import * as request from 'superagent'
import { Request, Response } from 'superagent'

let fromSuperagent =
  (request: Request): Observable<any> => $.create((obs: Observer<Response>): () => void => {
    request.end((err, res) => {
      if (err) {
        obs.onError(err)
      } else {
        obs.onNext(res)
      }
      obs.onCompleted()
    })

  return () => request.abort()
})

export function makeAPIRequest ({
  token,
  method,
  query,
  httpMethod = 'POST'
}: TelegramAPIRequest): Observable<TelegramAPIResponseResult | TelegramAPIError> {
  let endpoint = `https://api.telegram.org/bot${token}`
  let url = `${endpoint}/${method}`
  let req = request(httpMethod, url)
    .redirects(0)
    .send(query)

  return fromSuperagent(req)
    .catch(e => $.throw(e instanceof Error ? e : new Error(e)))
    .map<TelegramAPIResponse>(res => res.body)
    .map(body => body.ok
      ? $.just(body.result)
      : $.throw(body))
    .switch()
}
