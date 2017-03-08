"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var request = require("superagent");
var ramda_1 = require("ramda");
var fromSuperagent = function (request) { return rxjs_1.Observable.create(function (obs) {
    request.end(function (err, res) {
        if (err) {
            obs.error(err);
        }
        else {
            obs.next(res);
        }
        obs.complete();
    });
    return function () { return request.abort(); };
}); };
var transformReq = ramda_1.curryN(2, function (req, multipart) { return ramda_1.ifElse(function () { return multipart; }, ramda_1.pipe(ramda_1.mapObjIndexed(function (v, k) { return v
    ? req[ramda_1.propOr(false, 'path', v) ? 'attach' : 'field'](k, v)
    : req; }), ramda_1.values, ramda_1.last), req.send.bind(req)); });
function makeAPIRequest(_a, multipart) {
    var token = _a.token, method = _a.method, query = _a.query, _b = _a.httpMethod, httpMethod = _b === void 0 ? 'POST' : _b;
    if (multipart === void 0) { multipart = false; }
    var endpoint = "https://api.telegram.org/bot" + token;
    var url = endpoint + "/" + method;
    var req = transformReq(request(httpMethod, url).redirects(0), multipart)(query);
    return fromSuperagent(req)
        .catch(function (e) { return rxjs_1.Observable.throw(e instanceof Error ? e : new Error(e)); })
        .map(function (res) { return res.body; })
        .map(function (body) { return body.ok
        ? rxjs_1.Observable.of(body.result)
        : rxjs_1.Observable.throw(body); })
        .switch();
}
exports.makeAPIRequest = makeAPIRequest;
//# sourceMappingURL=api-request.js.map