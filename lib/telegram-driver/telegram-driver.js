'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTelegramDriver = makeTelegramDriver;

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _ramda = require('ramda');

var _sources = require('./sources');

var _apiRequest = require('./api-request');

var _types = require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeEventsSelector(sources) {
  return function events(eventName) {
    var messageSources = {
      'message': sources.message.share()
    };

    var inlineQuerySources = {
      'inline_query': sources.inlineQuery.share(),
      'chosen_inline_result': sources.chosenInlineResult.share()
    };

    var callbackQuerySources = {
      'callback_query': sources.callbackQuery.share()
    };

    // return interface
    return _rx2.default.Observable.case(function () {
      return eventName;
    }, Object.assign({}, messageSources, inlineQuerySources, callbackQuerySources));
  };
}

var handleWebhook = function handleWebhook(token, request, action) {
  return request.mergeAll().filter(_types.WebhookResponse.is).map((0, _ramda.prop)('update')).do(function (x) {
    return console.log('webhook', x);
  }).subscribe(function (upd) {
    return action.onNext([upd]);
  }, function (err) {
    return console.error('request error: ', err);
  });
};

var handleRequest = function handleRequest(token, request) {
  return request.mergeAll().filter(_types.Request.is).flatMap(function (_ref) {
    var method = _ref.method;
    var query = _ref.options;
    return (0, _apiRequest.makeAPIRequest)({ token: token, method: method, query: query }).catch(_rx2.default.Observable.empty());
  }).subscribe(function (req) {
    return console.log('response: ', req);
  }, function (err) {
    return console.error('request error: ', err);
  });
};

function makeTelegramDriver(token) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var proxy = (0, _sources.makeUpdates)(token);
  var action = new _rx2.default.Subject();
  if (options.webhook) {
    proxy = (0, _sources.makeWebHook)(token, action);
  }

  var updates = proxy.doOnError(function (err) {
    return console.error('updates error: ', err);
  }).replay(null, 1);

  var sources = (0, _sources.makeSources)(updates);
  var disposable = updates.connect();

  return function telegramDriver(request) {
    // pass request
    if (options.webhook) {
      // handle webhook
      handleWebhook(token, request, action);
    }
    // handle request
    handleRequest(token, request);

    // return interface
    return {
      token: token,
      observable: updates,
      events: makeEventsSelector(sources),
      dispose: function dispose() {
        return disposable.dispose();
      }
    };
  };
}