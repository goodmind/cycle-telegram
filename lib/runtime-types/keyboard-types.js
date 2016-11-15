"use strict";
var t = require("tcomb");
var types_1 = require("./types");
exports.KeyboardButton = t.struct({
    text: t.String,
    request_contact: t.maybe(t.Boolean),
    request_location: t.maybe(t.Boolean)
});
exports.ReplyKeyboardMarkup = t.struct({
    keyboard: t.list(t.list(exports.KeyboardButton)),
    resize_keyboard: t.maybe(t.Boolean),
    one_time_keyboard: t.maybe(t.Boolean),
    selective: t.maybe(t.Boolean)
});
exports.ReplyKeyboardHide = t.struct({
    hide_keyboard: t.Boolean,
    selective: t.maybe(t.Boolean)
});
exports.InlineKeyboardButton = t.struct({
    text: t.String,
    url: t.maybe(t.String),
    callback_data: t.maybe(t.String),
    callback_game: t.maybe(types_1.CallbackGame),
    switch_inline_query: t.maybe(t.String),
    switch_inline_query_current_chat: t.maybe(t.String)
});
exports.InlineKeyboardMarkup = t.struct({
    inline_keyboard: t.list(t.list(exports.InlineKeyboardButton))
});
exports.ForceReply = t.struct({
    force_reply: t.Boolean,
    selective: t.maybe(t.Boolean)
});
//# sourceMappingURL=keyboard-types.js.map