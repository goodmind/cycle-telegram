"use strict";
var t = require('tcomb');
var m = require('./multimedia-types');
var k = require('./keyboard-types');
exports.User = t.struct({
    id: t.Number,
    first_name: t.String,
    last_name: t.maybe(t.String),
    username: t.maybe(t.String)
});
exports.Chat = t.struct({
    id: t.Number,
    type: t.String,
    title: t.maybe(t.String),
    username: t.maybe(t.String),
    first_name: t.maybe(t.String),
    last_name: t.maybe(t.String)
});
exports.InputMessageContent = t.struct({
    message_text: t.String,
    parse_mode: t.maybe(t.String),
    disable_web_page_preview: t.maybe(t.Boolean)
});
exports.InlineQueryResult = t.struct({});
exports.InlineQueryResultArticle = exports.InlineQueryResult.extend({
    type: t.String,
    id: t.String,
    title: t.String,
    input_message_content: exports.InputMessageContent,
    reply_markup: t.maybe(k.InlineKeyboardMarkup),
    url: t.maybe(t.String),
    hide_url: t.maybe(t.Boolean),
    description: t.maybe(t.String),
    thumb_url: t.maybe(t.String),
    thumb_width: t.maybe(t.Number),
    thumb_height: t.maybe(t.Number)
});
exports.MessageEntity = t.struct({
    type: t.enums.of([
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
    offset: t.Number,
    length: t.Number,
    url: t.maybe(t.String)
});
exports.Message = t.declare('Message');
exports.Message.define(t.struct({
    message_id: t.Number,
    from: t.maybe(exports.User),
    date: t.Number,
    chat: exports.Chat,
    forward_from: t.maybe(exports.User),
    forward_date: t.maybe(t.Number),
    reply_to_message: t.maybe(exports.Message),
    text: t.maybe(t.String),
    entities: t.maybe(t.list(exports.MessageEntity)),
    audio: t.maybe(m.Audio),
    document: t.maybe(m.Document),
    photo: t.maybe(t.list(m.PhotoSize)),
    sticker: t.maybe(m.Sticker),
    video: t.maybe(m.Video),
    voice: t.maybe(m.Voice),
    caption: t.maybe(t.String),
    contact: t.maybe(m.Contact),
    location: t.maybe(m.Location),
    venue: t.maybe(m.Venue),
    new_chat_member: t.maybe(exports.User),
    left_chat_member: t.maybe(exports.User),
    new_chat_title: t.maybe(t.String),
    new_chat_photo: t.maybe(t.list(m.PhotoSize)),
    delete_chat_photo: t.maybe(t.Boolean),
    group_chat_created: t.maybe(t.Boolean),
    supergroup_chat_created: t.maybe(t.Boolean),
    channel_chat_created: t.maybe(t.Boolean),
    migrate_to_chat_id: t.maybe(t.Number),
    migrate_from_chat_id: t.maybe(t.Number),
    pinned_message: t.maybe(exports.Message)
}));
exports.InlineQuery = t.struct({
    id: t.String,
    from: exports.User,
    location: t.maybe(m.Location),
    query: t.String,
    offset: t.String
});
exports.ChosenInlineResult = t.struct({
    result_id: t.String,
    from: exports.User,
    location: t.maybe(m.Location),
    inline_message_id: t.maybe(t.String),
    query: t.String
});
exports.CallbackQuery = t.struct({
    id: t.String,
    from: exports.User,
    message: t.maybe(exports.Message),
    inline_message_id: t.maybe(t.String),
    data: t.maybe(t.String)
});
exports.Update = t.struct({
    update_id: t.Number,
    message: t.maybe(exports.Message),
    inline_query: t.maybe(exports.InlineQuery),
    chosen_inline_result: t.maybe(exports.ChosenInlineResult),
    callback_query: t.maybe(exports.CallbackQuery)
});
exports.UpdateInlineQuery = t.refinement(exports.Update, function (u) { return u.inline_query; }, 'UpdateInlineQuery');
exports.UpdateMessage = t.refinement(exports.Update, function (u) { return u.message; }, 'UpdateMessage');
exports.UpdateChosenInlineResult = t.refinement(exports.Update, function (u) { return u.chosen_inline_result; }, 'UpdateChosenInlineResult');
exports.UpdateCallbackQuery = t.refinement(exports.Update, function (u) { return u.callback_query; }, 'UpdateCallbackQuery');
exports.UpdatesState = t.struct({
    startDate: t.Number,
    offset: t.Number,
    updates: t.list(exports.Update)
});
exports.Request = t.struct({
    type: t.enums.of(['sink']),
    multipart: t.maybe(t.Boolean),
    method: t.String,
    options: t.Object
});
exports.WebhookResponse = t.struct({
    type: t.enums.of(['webhook']),
    update: exports.Update
});
//# sourceMappingURL=types.js.map