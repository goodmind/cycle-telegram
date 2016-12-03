"use strict";
var rx_1 = require("rx");
var ramda_1 = require("ramda");
var api_request_1 = require("./api-request");
var types_1 = require("../runtime-types/types");
var messageLife = function (_a) {
    var update = _a[0], startDate = _a[1];
    return (startDate - (update.message || update.channel_post).date * 1000) <= 30000;
};
var max = ramda_1.curryN(3, function (property, acc, current) {
    return current[property] > acc ? current[property] : acc;
});
var makeUpdatesResolver = ramda_1.curryN(2, function (token, offset) { return api_request_1.makeAPIRequest({
    token: token,
    method: 'getUpdates',
    query: { offset: offset, timeout: 60000 }
}); });
function makeUpdates(initialState, token) {
    types_1.UpdatesState(initialState);
    var resolve = makeUpdatesResolver(token);
    return rx_1.Observable.return(initialState).expand(function (_a) {
        var offset = _a.offset;
        return resolve(offset)
            .combineLatest(rx_1.Observable.interval(500).take(1), function (updates, _) { return types_1.UpdatesState({
            startDate: initialState.startDate,
            offset: ramda_1.reduce(max('update_id'), 0, updates) + 1,
            updates: updates
        }); });
    });
}
exports.makeUpdates = makeUpdates;
function makeWebHook(initialState, action) {
    types_1.UpdatesState(initialState);
    var webHookUpdates = action.share();
    return rx_1.Observable.concat(rx_1.Observable.just(initialState), webHookUpdates.map(function (updates) { return types_1.UpdatesState({
        startDate: initialState.startDate,
        offset: ramda_1.reduce(max('update_id'), 0, updates) + 1,
        updates: updates
    }); }))
        .share();
}
exports.makeWebHook = makeWebHook;
function makeSources(state) {
    var updates = state
        .pluck('updates')
        .map(ramda_1.unary(rx_1.Observable.from))
        .switch()
        .share();
    var startDate = state
        .pluck('startDate')
        .share();
    return {
        message: rx_1.Observable.zip(updates, startDate)
            .filter(ramda_1.pipe(ramda_1.head, ramda_1.propIs(types_1.Message, 'message')))
            .filter(messageLife)
            .map(ramda_1.head)
            .share(),
        channelPost: rx_1.Observable.zip(updates, startDate)
            .filter(ramda_1.pipe(ramda_1.head, ramda_1.propIs(types_1.Message, 'channel_post')))
            .filter(messageLife)
            .map(ramda_1.head)
            .share(),
        inlineQuery: updates
            .filter(ramda_1.propIs(types_1.InlineQuery, 'inline_query'))
            .share(),
        chosenInlineResult: updates
            .filter(ramda_1.propIs(types_1.ChosenInlineResult, 'chosen_inline_result'))
            .share(),
        callbackQuery: updates
            .filter(ramda_1.propIs(types_1.CallbackQuery, 'callback_query'))
            .share()
    };
}
exports.makeSources = makeSources;
//# sourceMappingURL=sources.js.map