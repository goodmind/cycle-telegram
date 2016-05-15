'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAPIRequest = makeAPIRequest;

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _http = require('@cycle/http');

var _nodeUuid = require('node-uuid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareOptions = function prepareOptions(options, query) {
  return Object.assign(options, options.httpMethod === 'POST' ? { send: query } : { query: query });
};

function makeAPIRequest(_ref) {
  var token = _ref.token;
  var method = _ref.method;
  var query = _ref.query;
  var _ref$httpMethod = _ref.httpMethod;
  var httpMethod = _ref$httpMethod === undefined ? 'POST' : _ref$httpMethod;
  var _ref$httpDriver = _ref.httpDriver;
  var httpDriver = _ref$httpDriver === undefined ? (0, _http.makeHTTPDriver)() : _ref$httpDriver;

  var endpoint = 'https://api.telegram.org/bot' + token;
  var url = endpoint + '/' + method;
  var uuid = (0, _nodeUuid.v4)();

  var request = _rx2.default.Observable.just(prepareOptions({
    method: httpMethod,
    redirects: 0,
    uuid: uuid,
    url: url
  }, query));

  return httpDriver(request).filter(function (res) {
    return res.request.uuid === uuid;
  }).switch().catch(function (e) {
    return _rx2.default.Observable.throw(e instanceof Error ? e : new Error(e));
  }).map(function (res) {
    return res.body;
  }).map(function (body) {
    return body.ok ? _rx2.default.Observable.just(body.result) : _rx2.default.Observable.throw(new Error(body));
  }).switch();
}