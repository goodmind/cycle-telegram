"use strict";
var rx_1 = require('rx');
var ramda_1 = require('ramda');
var sources_1 = require('./sources');
var api_request_1 = require('./api-request');
var types_1 = require('../types');
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
        return rx_1.default.Observable.case(function () { return eventName; }, ramda_1.mergeAll([messageSources, inlineQuerySources, callbackQuerySources]));
    };
}
var handleWebhook = function (token, request, action) {
    return request.mergeAll()
        .filter(types_1.WebhookResponse.is)
        .map(ramda_1.prop('update'))
        .subscribe(function (upd) { return action.onNext([upd]); }, function (err) { return console.error('request error: ', err); });
};
var handleRequest = function (token, request) {
    return request.mergeAll()
        .filter(types_1.Request.is)
        .flatMap(function (_a) {
        var method = _a.method, query = _a.options;
        return api_request_1.makeAPIRequest({ token: token, method: method, query: query });
    });
};
function makeTelegramDriver(token, options) {
    if (options === void 0) { options = {}; }
    var state = {
        startDate: options.startDate || Date.now(),
        offset: 0,
        updates: []
    };
    var proxy = sources_1.makeUpdates(state, token);
    var action = new rx_1.default.Subject();
    if (options.webhook) {
        proxy = sources_1.makeWebHook(state, action);
    }
    var updates = proxy
        .doOnError(function (err) {
        console.error('updates error: ', err);
        console.warn('Waiting 30 seconds before retry...');
    })
        .catch(proxy.delay(30000))
        .replay(null, 1);
    var sources = sources_1.makeSources(updates);
    var disposable = updates.connect();
    return function telegramDriver(request) {
        // pass request
        if (options.webhook) {
            // handle webhook
            handleWebhook(token, request, action);
        }
        var newRequest = handleRequest(token, request)
            .share();
        newRequest.subscribeOnError(function (err) { return console.error('request error: ', err); });
        // return interface
        return {
            token: token,
            observable: updates,
            responses: newRequest,
            events: makeEventsSelector(sources),
            dispose: function () { return disposable.dispose(); }
        };
    };
}
exports.makeTelegramDriver = makeTelegramDriver;
//# sourceMappingURL=telegram-driver.js.map