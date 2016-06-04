import { Observable as $ } from 'rx'
import request from 'superagent'

let fromSuperagent = request => Rx.Observable.create(obs => {
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
}) {
  let endpoint = `https://api.telegram.org/bot${token}`
  let url = `${endpoint}/${method}`
  let req = request(httpMethod, url)
    .redirects(0)
    .send(query)

  return fromSuperagent(req)
    .catch(e => $.throw(e instanceof Error ? e : new Error(e)))
    .map(res => res.body)
    .map(body => body.ok
      ? $.just(body.result)
      : $.throw(new Error(body)))
    .switch()
}
