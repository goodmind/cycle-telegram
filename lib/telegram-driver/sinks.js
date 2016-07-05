"use strict";
var runtime_types_1 = require('../runtime-types');
var ramda_1 = require('ramda');
var defaults = ramda_1.curryN(2, function (transformations, obj) { return ramda_1.compose(ramda_1.evolve(transformations), ramda_1.pickAll)(ramda_1.chain(ramda_1.keys, [transformations, obj]), obj); });
exports.broadcast = ramda_1.curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'sendMessage',
        options: defaults({
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            text: ramda_1.defaultTo('Null-catch: no text provided'),
            reply_markup: JSON.stringify
        }, options)
    });
});
exports.reply = ramda_1.curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'sendMessage',
        options: defaults({
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            reply_to_message_id: ramda_1.defaultTo(ramda_1.path(['message', 'message_id'], update)),
            text: ramda_1.defaultTo('Null-catch: no text provided'),
            reply_markup: JSON.stringify
        }, ramda_1.is(String, options) ? { text: options } : options)
    });
});
exports.answerInlineQuery = ramda_1.curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    var updateResults = function (results) { return results[0].id ? results : ramda_1.map(function (answer) { return ramda_1.assoc('id', Math.random().toString(36).substring(2), answer); }, results || []); };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'answerInlineQuery',
        options: defaults({
            inline_query_id: ramda_1.defaultTo(ramda_1.path(['inline_query', 'id'], update)),
            results: ramda_1.compose(JSON.stringify, updateResults)
        }, ramda_1.isArrayLike(options) ? { results: options } : options)
    });
});
exports.answerCallbackQuery = ramda_1.curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'answerCallbackQuery',
        options: defaults({
            callback_query_id: ramda_1.defaultTo(ramda_1.path(['callback_query', 'id'], update))
        })
    });
});
exports.setWebhook = function (options) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'setWebhook',
        options: options
    });
};
exports.webhook = function (update) { return runtime_types_1.WebhookResponse({
    type: 'webhook',
    update: update
}); };
//# sourceMappingURL=sinks.js.map