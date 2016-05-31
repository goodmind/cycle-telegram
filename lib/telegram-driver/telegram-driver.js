'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTelegramDriver = makeTelegramDriver;

var _rx = require('rx');

var _rxAdapter = require('@cycle/rx-adapter');

var _rxAdapter2 = _interopRequireDefault(_rxAdapter);

var _ramda = require('ramda');

var _sources = require('./sources');

var _apiRequest = require('./api-request');

var _types = require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeEventsSelector(sources, adapt) {
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
    var rxStream = _rx.Observable.case(function () {
      return eventName;
    }, (0, _ramda.mergeAll)([messageSources, inlineQuerySources, callbackQuerySources]));

    return adapt(rxStream);
  };
}

var handleWebhook = function handleWebhook(token, request, action) {
  return request.mergeAll().filter(_types.WebhookResponse.is).map((0, _ramda.prop)('update')).subscribe(function (upd) {
    return action.onNext([upd]);
  }, function (err) {
    return console.error('request error: ', err);
  });
};

var handleRequest = function handleRequest(token, request) {
  return request.mergeAll().filter(_types.Request.is).flatMap(function (_ref) {
    var method = _ref.method;
    var query = _ref.options;
    return (0, _apiRequest.makeAPIRequest)({ token: token, method: method, query: query });
  });
};

var adapter = function adapter(runSA) {
  return function (stream) {
    return runSA ? runSA.adapt(stream, _rxAdapter2.default.streamSubscribe) : stream;
  };
};

function makeTelegramDriver(token) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var state = {
    startDate: options.startDate || Date.now(),
    offset: 0,
    updates: []
  };

  var proxy = (0, _sources.makeUpdates)(state, token);
  var action = new _rx.Subject();

  if (options.webhook) {
    proxy = (0, _sources.makeWebHook)(state, action);
  }

  var updates = proxy.doOnError(function (err) {
    console.error('updates error: ', err);
    console.warn('Waiting 30 seconds before retry...');
  }).catch(proxy.delay(30000)).replay(null, 1);

  var sources = (0, _sources.makeSources)(updates);
  var disposable = updates.connect();

  function telegramDriver(request, runSA) {
    var adapt = adapter(runSA);
    // pass request
    if (options.webhook) {
      // handle webhook
      handleWebhook(token, request, action);
    }

    var newRequest = handleRequest(token, request).share();

    newRequest.subscribeOnError(function (err) {
      return console.error('request error: ', err);
    });

    // return interface
    return {
      token: token,
      observable: adapt(updates),
      responses: adapt(newRequest), // handle request
      events: makeEventsSelector(sources, adapt),
      dispose: function dispose() {
        return disposable.dispose();
      }
    };
  }

  telegramDriver.streamAdapter = _rxAdapter2.default;

  return telegramDriver;
}