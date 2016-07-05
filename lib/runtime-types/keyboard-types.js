"use strict";
var tcomb_1 = require('tcomb');
exports.KeyboardButton = tcomb_1.default.struct({
    text: tcomb_1.default.String,
    request_contact: tcomb_1.default.maybe(tcomb_1.default.Boolean),
    request_location: tcomb_1.default.maybe(tcomb_1.default.Boolean)
});
exports.ReplyKeyboardMarkup = tcomb_1.default.struct({
    keyboard: tcomb_1.default.list(tcomb_1.default.list(exports.KeyboardButton)),
    resize_keyboard: tcomb_1.default.maybe(tcomb_1.default.Boolean),
    one_time_keyboard: tcomb_1.default.maybe(tcomb_1.default.Boolean),
    selective: tcomb_1.default.maybe(tcomb_1.default.Boolean)
});
exports.ReplyKeyboardHide = tcomb_1.default.struct({
    hide_keyboard: tcomb_1.default.Boolean,
    selective: tcomb_1.default.maybe(tcomb_1.default.Boolean)
});
exports.InlineKeyboardButton = tcomb_1.default.struct({
    text: tcomb_1.default.String,
    url: tcomb_1.default.maybe(tcomb_1.default.String),
    callback_data: tcomb_1.default.maybe(tcomb_1.default.String),
    switch_inline_query: tcomb_1.default.maybe(tcomb_1.default.String)
});
exports.InlineKeyboardMarkup = tcomb_1.default.struct({
    inline_keyboard: tcomb_1.default.list(tcomb_1.default.list(exports.InlineKeyboardButton))
});
exports.ForceReply = tcomb_1.default.struct({
    force_reply: tcomb_1.default.Boolean,
    selective: tcomb_1.default.maybe(tcomb_1.default.Boolean)
});
//# sourceMappingURL=keyboard-types.js.map