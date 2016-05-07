import Rx from 'rx';
import { makeHTTPDriver } from '@cycle/http';
import { v4 } from 'node-uuid';

let prepareOptions = (options, query) => {
  if (options.httpMethod === 'POST') {
    return Object.assign(options, { send: query });
  }

  return Object.assign(options, { query });
};

export function makeAPIRequest({token, method, query, httpMethod = 'POST', httpDriver = makeHTTPDriver()}) {
  const ENDPOINT = `https://api.telegram.org/bot${token}`;
  const url = `${ENDPOINT}/${method}`;
  const uuid = v4();

  const request$ = Rx.Observable.just(
    prepareOptions({
      method: httpMethod,
      redirects: 0,
      uuid,
      url
    }, query)
  );

  try {
    return httpDriver(request$)
      .filter(res$ => res$.request.uuid === uuid)
      .switch()
      .catch(e => Rx.Observable.throw(new Error('Bad API token')))
      .map(res => res.body)
      .map(body => body.ok ? Rx.Observable.just(body.result) : Rx.Observable.throw(new Error(body)))
      .mergeAll();
  } catch(e) {
    return Rx.Observable.throw(e);
  }
}
