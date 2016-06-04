"use strict";
var rx_1 = require('rx');
var superagent_1 = require('superagent');
var fromSuperagent = function (request) { return rx_1.Observable.create(function (obs) {
    request.end(function (err, res) {
        if (err) {
            obs.onError(err);
        }
        else {
            obs.onNext(res);
        }
        obs.onCompleted();
    });
    return function () { return request.abort(); };
}); };
function makeAPIRequest(_a) {
    var token = _a.token, method = _a.method, query = _a.query, _b = _a.httpMethod, httpMethod = _b === void 0 ? 'POST' : _b;
    var endpoint = "https://api.telegram.org/bot" + token;
    var url = endpoint + "/" + method;
    var req = superagent_1.default(httpMethod, url)
        .redirects(0)
        .send(query);
    return fromSuperagent(req)
        .catch(function (e) { return rx_1.Observable.throw(e instanceof Error ? e : new Error(e)); })
        .map(function (res) { return res.body; })
        .map(function (body) { return body.ok
        ? rx_1.Observable.just(body.result)
        : rx_1.Observable.throw(new Error(body)); })
        .switch();
}
exports.makeAPIRequest = makeAPIRequest;
//# sourceMappingURL=api-request.js.map