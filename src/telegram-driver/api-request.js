import Rx from 'rx'
import { makeHTTPDriver } from '@cycle/http'
import { v4 } from 'node-uuid'

let prepareOptions = (options, query) => Object.assign(
  options, options.httpMethod === 'POST' ? { send: query } : { query }
)

export function makeAPIRequest ({
  token,
  method,
  query,
  httpMethod = 'POST',
  httpDriver = makeHTTPDriver()
}) {
  let endpoint = `https://api.telegram.org/bot${token}`
  let url = `${endpoint}/${method}`
  let uuid = v4()

  let request = Rx.Observable.just(prepareOptions({
    method: httpMethod,
    redirects: 0,
    uuid,
    url
  }, query))

  return httpDriver(request)
    .filter(res => res.request.uuid === uuid)
    .switch()
    .catch(e => Rx.Observable.throw(e instanceof Error ? e : new Error(e)))
    .map(res => res.body)
    .map(
      body => body.ok ? Rx.Observable.just(body.result)
        : Rx.Observable.throw(new Error(body)))
    .switch()
}
