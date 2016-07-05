"use strict";
var tcomb_1 = require('tcomb');
var m = require('./multimedia-types');
var k = require('./keyboard-types');
exports.User = tcomb_1.default.struct({
    id: tcomb_1.default.Number,
    first_name: tcomb_1.default.String,
    last_name: tcomb_1.default.maybe(tcomb_1.default.String),
    username: tcomb_1.default.maybe(tcomb_1.default.String)
});
exports.Chat = tcomb_1.default.struct({
    id: tcomb_1.default.Number,
    type: tcomb_1.default.String,
    title: tcomb_1.default.maybe(tcomb_1.default.String),
    username: tcomb_1.default.maybe(tcomb_1.default.String),
    first_name: tcomb_1.default.maybe(tcomb_1.default.String),
    last_name: tcomb_1.default.maybe(tcomb_1.default.String)
});
exports.InputMessageContent = tcomb_1.default.struct({
    message_text: tcomb_1.default.String,
    parse_mode: tcomb_1.default.maybe(tcomb_1.default.String),
    disable_web_page_preview: tcomb_1.default.maybe(tcomb_1.default.Boolean)
});
exports.InlineQueryResult = tcomb_1.default.struct({});
exports.InlineQueryResultArticle = exports.InlineQueryResult.extend({
    type: tcomb_1.default.String,
    id: tcomb_1.default.String,
    title: tcomb_1.default.String,
    input_message_content: exports.InputMessageContent,
    reply_markup: tcomb_1.default.maybe(k.InlineKeyboardMarkup),
    url: tcomb_1.default.maybe(tcomb_1.default.String),
    hide_url: tcomb_1.default.maybe(tcomb_1.default.Boolean),
    description: tcomb_1.default.maybe(tcomb_1.default.String),
    thumb_url: tcomb_1.default.maybe(tcomb_1.default.String),
    thumb_width: tcomb_1.default.maybe(tcomb_1.default.Number),
    thumb_height: tcomb_1.default.maybe(tcomb_1.default.Number)
});
exports.MessageEntity = tcomb_1.default.struct({
    type: tcomb_1.default.enums.of([
        'mention',
        'hashtag',
        'bot_command',
        'url',
        'email',
        'bold',
        'italic',
        'code',
        'pre',
        'text_link',
        'text_mention'
    ]),
    offset: tcomb_1.default.Number,
    length: tcomb_1.default.Number,
    url: tcomb_1.default.maybe(tcomb_1.default.String)
});
exports.Message = tcomb_1.default.declare('Message');
exports.Message.define(tcomb_1.default.struct({
    message_id: tcomb_1.default.Number,
    from: tcomb_1.default.maybe(exports.User),
    date: tcomb_1.default.Number,
    chat: exports.Chat,
    forward_from: tcomb_1.default.maybe(exports.User),
    forward_date: tcomb_1.default.maybe(tcomb_1.default.Number),
    reply_to_message: tcomb_1.default.maybe(exports.Message),
    text: tcomb_1.default.maybe(tcomb_1.default.String),
    entities: tcomb_1.default.maybe(tcomb_1.default.list(exports.MessageEntity)),
    audio: tcomb_1.default.maybe(m.Audio),
    document: tcomb_1.default.maybe(m.Document),
    photo: tcomb_1.default.maybe(tcomb_1.default.list(m.PhotoSize)),
    sticker: tcomb_1.default.maybe(m.Sticker),
    video: tcomb_1.default.maybe(m.Video),
    voice: tcomb_1.default.maybe(m.Voice),
    caption: tcomb_1.default.maybe(tcomb_1.default.String),
    contact: tcomb_1.default.maybe(m.Contact),
    location: tcomb_1.default.maybe(m.Location),
    venue: tcomb_1.default.maybe(m.Venue),
    new_chat_member: tcomb_1.default.maybe(exports.User),
    left_chat_member: tcomb_1.default.maybe(exports.User),
    new_chat_title: tcomb_1.default.maybe(tcomb_1.default.String),
    new_chat_photo: tcomb_1.default.maybe(tcomb_1.default.list(m.PhotoSize)),
    delete_chat_photo: tcomb_1.default.maybe(tcomb_1.default.Boolean),
    group_chat_created: tcomb_1.default.maybe(tcomb_1.default.Boolean),
    supergroup_chat_created: tcomb_1.default.maybe(tcomb_1.default.Boolean),
    channel_chat_created: tcomb_1.default.maybe(tcomb_1.default.Boolean),
    migrate_to_chat_id: tcomb_1.default.maybe(tcomb_1.default.Number),
    migrate_from_chat_id: tcomb_1.default.maybe(tcomb_1.default.Number),
    pinned_message: tcomb_1.default.maybe(exports.Message)
}));
exports.InlineQuery = tcomb_1.default.struct({
    id: tcomb_1.default.String,
    from: exports.User,
    location: tcomb_1.default.maybe(m.Location),
    query: tcomb_1.default.String,
    offset: tcomb_1.default.String
});
exports.ChosenInlineResult = tcomb_1.default.struct({
    result_id: tcomb_1.default.String,
    from: exports.User,
    location: tcomb_1.default.maybe(m.Location),
    inline_message_id: tcomb_1.default.maybe(tcomb_1.default.String),
    query: tcomb_1.default.String
});
exports.CallbackQuery = tcomb_1.default.struct({
    id: tcomb_1.default.String,
    from: exports.User,
    message: tcomb_1.default.maybe(exports.Message),
    inline_message_id: tcomb_1.default.maybe(tcomb_1.default.String),
    data: tcomb_1.default.maybe(tcomb_1.default.String)
});
exports.Update = tcomb_1.default.struct({
    update_id: tcomb_1.default.Number,
    message: tcomb_1.default.maybe(exports.Message),
    inline_query: tcomb_1.default.maybe(exports.InlineQuery),
    chosen_inline_result: tcomb_1.default.maybe(exports.ChosenInlineResult),
    callback_query: tcomb_1.default.maybe(exports.CallbackQuery)
});
exports.UpdateInlineQuery = tcomb_1.default.refinement(exports.Update, function (u) { return u.inline_query; }, 'UpdateInlineQuery');
exports.UpdateMessage = tcomb_1.default.refinement(exports.Update, function (u) { return u.message; }, 'UpdateMessage');
exports.UpdateChosenInlineResult = tcomb_1.default.refinement(exports.Update, function (u) { return u.chosen_inline_result; }, 'UpdateChosenInlineResult');
exports.UpdateCallbackQuery = tcomb_1.default.refinement(exports.Update, function (u) { return u.callback_query; }, 'UpdateCallbackQuery');
exports.UpdatesState = tcomb_1.default.struct({
    startDate: tcomb_1.default.Number,
    offset: tcomb_1.default.Number,
    updates: tcomb_1.default.list(exports.Update)
});
exports.Request = tcomb_1.default.struct({
    type: tcomb_1.default.enums.of(['sink']),
    method: tcomb_1.default.String,
    options: tcomb_1.default.Object
});
exports.WebhookResponse = tcomb_1.default.struct({
    type: tcomb_1.default.enums.of(['webhook']),
    update: exports.Update
});
//# sourceMappingURL=types.js.map