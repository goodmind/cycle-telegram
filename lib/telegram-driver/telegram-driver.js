"use strict";
var rx_adapter_1 = require("@cycle/rx-adapter");
var rx_1 = require("rx");
var ramda_1 = require("ramda");
var sources_1 = require("./sources");
var api_request_1 = require("./api-request");
var _1 = require(".");
var helpers_1 = require("../helpers");
function makeEventsSelector(_a) {
    var message = _a.message, inlineQuery = _a.inlineQuery, chosenInlineResult = _a.chosenInlineResult, callbackQuery = _a.callbackQuery;
    return function events(eventName) {
        return rx_1.Observable.case(function () { return eventName; }, {
            'message': message.share(),
            'inline_query': inlineQuery.share(),
            'chosen_inline_result': chosenInlineResult.share(),
            'callback_query': callbackQuery.share()
        });
    };
}
var handleWebhook = function (token, request, proxy) {
    return request.mergeAll()
        .filter(_1.WebhookResponse.is)
        .pluck('update')
        .subscribe(function (upd) { return proxy.onNext([upd]); }, function (err) { return console.error('request error: ', err); });
};
var handleRequest = function (token, request) {
    return request.mergeAll()
        .filter(_1.Request.is)
        .flatMap(function (_a) {
        var method = _a.method, multipart = _a.multipart, query = _a.options;
        return api_request_1.makeAPIRequest({ token: token, method: method, query: query }, multipart);
    });
};
function makeTelegramDriver(token, options) {
    if (options === void 0) { options = {}; }
    var state = {
        startDate: options.startDate || Date.now(),
        offset: 0,
        updates: []
    };
    var proxyUpdates = options.skipUpdates ? rx_1.Observable.never() : sources_1.makeUpdates(state, token);
    var proxyWebHook = new rx_1.Subject();
    if (options.webhook) {
        proxyUpdates = sources_1.makeWebHook(state, proxyWebHook);
    }
    var updates = proxyUpdates
        .doOnError(function (err) {
        console.error('updates error: ', err);
        console.warn('Waiting 30 seconds before retry...');
    })
        .catch(proxyUpdates.delay(30000))
        .replay(null, 1);
    var sources = sources_1.makeSources(updates);
    var disposable = updates.connect();
    function telegramDriver(sourceRequest, runSA) {
        var adapt = helpers_1.adapter(runSA);
        var request = sourceRequest.map(function (x) { return helpers_1.convertStream(x, runSA, rx_adapter_1.default); });
        if (helpers_1.isWebhookResponse(request, options)) {
            handleWebhook(token, request, proxyWebHook);
        }
        var responses = handleRequest(token, request).share();
        responses.subscribeOnError(function (err) { return console.error('request error: ', err); });
        return Object.assign({
            token: token,
            dispose: function () { return disposable.dispose(); }
        }, ramda_1.mapObjIndexed(adapt, {
            events: makeEventsSelector(sources),
            updates: updates,
            responses: responses
        }));
    }
    telegramDriver.streamAdapter = rx_adapter_1.default;
    return telegramDriver;
}
exports.makeTelegramDriver = makeTelegramDriver;
//# sourceMappingURL=telegram-driver.js.map