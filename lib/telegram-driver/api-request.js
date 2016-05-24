'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAPIRequest = makeAPIRequest;

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareOptions = function prepareOptions(options, query) {
  return Object.assign(options, options.httpMethod === 'POST' ? { send: query } : { query: query });
};

var fromSuperagent = function fromSuperagent(request) {
  return _rx2.default.Observable.create(function (obs) {
    request.end(function (err, res) {
      if (err) {
        obs.onError(err);
      } else {
        obs.onNext(res);
      }
      obs.onCompleted();
    });

    return function () {
      return request.abort();
    };
  });
};

function makeAPIRequest(_ref) {
  var token = _ref.token;
  var method = _ref.method;
  var query = _ref.query;
  var _ref$httpMethod = _ref.httpMethod;
  var httpMethod = _ref$httpMethod === undefined ? 'POST' : _ref$httpMethod;

  var endpoint = 'https://api.telegram.org/bot' + token;
  var url = endpoint + '/' + method;
  var req = (0, _superagent2.default)(httpMethod, url).redirects(0).send(query);

  return fromSuperagent(req).catch(function (e) {
    return _rx2.default.Observable.throw(e instanceof Error ? e : new Error(e));
  }).map(function (res) {
    return res.body;
  }).map(function (body) {
    return body.ok ? _rx2.default.Observable.just(body.result) : _rx2.default.Observable.throw(new Error(body));
  }).switch();
}