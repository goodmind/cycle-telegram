'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTelegramLogDriver = makeTelegramLogDriver;

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _types = require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_rx2.default.config.longStackSupport = true;

var logResponse = function logResponse(state) {
  return _tcomb2.default.match(state, _types.Update, function (_ref) {
    var msg = _ref.message;

    console.log('>>> ' + ('' + _chalk2.default.gray('#') + _chalk2.default.blue(msg.message_id) + ' ') + (msg.text + ' ') + (_chalk2.default.yellow.bold('by') + ' ' + msg.from.username + ' ') + (_chalk2.default.yellow.bold('in') + ' ' + (msg.chat.title ? msg.chat.title : msg.chat.first_name)));
  }, _types.UpdatesState, function (_ref2) {
    var startDate = _ref2.startDate;

    console.log(_chalk2.default.green('Uptime is ' + new Date(startDate)));
  }, _tcomb2.default.Any, function () {
    console.log('Any Type: ', state);
  });
};

var handleRequest = function handleRequest(request, onNext) {
  return request.mergeAll().subscribe(onNext, function (err) {
    return console.error('request error: ', err);
  });
};

function makeTelegramLogDriver() {
  return function telegramLogDriver(request) {
    handleRequest(request, logResponse);
  };
}