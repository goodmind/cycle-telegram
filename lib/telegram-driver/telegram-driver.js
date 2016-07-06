'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTelegramDriver = makeTelegramDriver;

var _rx = require('rx');

var _sources = require('./sources');

var _apiRequest = require('./api-request');

var _types = require('../types');

function makeEventsSelector(_ref) {
  var message = _ref.message;
  var inlineQuery = _ref.inlineQuery;
  var chosenInlineResult = _ref.chosenInlineResult;
  var callbackQuery = _ref.callbackQuery;

  return function events(eventName) {
    return _rx.Observable.case(function () {
      return eventName;
    }, {
      'message': message.share(),
      'inline_query': inlineQuery.share(),
      'chosen_inline_result': chosenInlineResult.share(),
      'callback_query': callbackQuery.share()
    });
  };
}

var handleWebhook = function handleWebhook(token, request, proxy) {
  return request.mergeAll().filter(_types.WebhookResponse.is).pluck('update').subscribe(function (upd) {
    return proxy.onNext([upd]);
  }, function (err) {
    return console.error('request error: ', err);
  });
};

var handleRequest = function handleRequest(token, request) {
  return request.mergeAll().filter(_types.Request.is).flatMap(function (_ref2) {
    var method = _ref2.method;
    var query = _ref2.options;
    return (0, _apiRequest.makeAPIRequest)({ token: token, method: method, query: query });
  });
};

function makeTelegramDriver(token) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var state = {
    startDate: options.startDate || Date.now(),
    offset: 0,
    updates: []
  };

  var proxyUpdates = (0, _sources.makeUpdates)(state, token);
  var proxyWebHook = new _rx.Subject();

  if (options.webhook) {
    proxyUpdates = (0, _sources.makeWebHook)(state, proxyWebHook);
  }

  var updates = proxyUpdates.doOnError(function (err) {
    console.error('updates error: ', err);
    console.warn('Waiting 30 seconds before retry...');
  }).catch(proxyUpdates.delay(30000)).replay(null, 1);

  var sources = (0, _sources.makeSources)(updates);
  var disposable = updates.connect();

  return function telegramDriver(request) {
    if (options.webhook) {
      handleWebhook(token, request, proxyWebHook);
    }

    var responses = handleRequest(token, request).share();

    responses.subscribeOnError(function (err) {
      return console.error('request error: ', err);
    });

    return {
      token: token,
      updates: updates,
      responses: responses,
      events: makeEventsSelector(sources),
      dispose: function dispose() {
        return disposable.dispose();
      }
    };
  };
}