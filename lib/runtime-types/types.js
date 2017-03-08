"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("tcomb");
var m = require("./multimedia-types");
exports.InputFile = t.Any;
exports.User = t.struct({
    id: t.Number,
    first_name: t.String,
    last_name: t.maybe(t.String),
    username: t.maybe(t.String)
});
exports.ChatMember = t.struct({
    user: exports.User,
    status: t.enums.of([
        'creator',
        'administrator',
        'member',
        'left',
        'kicked'
    ])
});
exports.Chat = t.struct({
    id: t.Number,
    type: t.enums.of(['private', 'group', 'supergroup', 'channel']),
    title: t.maybe(t.String),
    username: t.maybe(t.String),
    first_name: t.maybe(t.String),
    last_name: t.maybe(t.String),
    all_members_are_administrators: t.maybe(t.Boolean)
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
    url: t.maybe(t.String),
    user: t.maybe(exports.User)
});
exports.GameHighScore = t.struct({
    position: t.Number,
    user: exports.User,
    score: t.Number
});
exports.Game = t.struct({
    title: t.String,
    description: t.String,
    photo: t.list(m.PhotoSize),
    text: t.maybe(t.String),
    text_entities: t.maybe(t.list(exports.MessageEntity)),
    animation: t.maybe(m.Animation)
});
exports.Message = t.declare('Message');
exports.Message.define(t.struct({
    message_id: t.Number,
    from: t.maybe(exports.User),
    edit_date: t.maybe(t.Number),
    date: t.Number,
    chat: exports.Chat,
    forward_from: t.maybe(exports.User),
    forward_from_chat: t.maybe(exports.Chat),
    forward_date: t.maybe(t.Number),
    reply_to_message: t.maybe(exports.Message),
    text: t.maybe(t.String),
    entities: t.maybe(t.list(exports.MessageEntity)),
    audio: t.maybe(m.Audio),
    document: t.maybe(m.Document),
    game: t.maybe(exports.Game),
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
exports.CallbackGame = t.struct({});
exports.CallbackQuery = t.struct({
    id: t.String,
    from: exports.User,
    message: t.maybe(exports.Message),
    inline_message_id: t.maybe(t.String),
    chat_instance: t.String,
    data: t.maybe(t.String),
    game_short_name: t.maybe(t.String)
});
exports.Update = t.struct({
    update_id: t.Number,
    message: t.maybe(exports.Message),
    edited_message: t.maybe(exports.Message),
    inline_query: t.maybe(exports.InlineQuery),
    chosen_inline_result: t.maybe(exports.ChosenInlineResult),
    callback_query: t.maybe(exports.CallbackQuery)
});
exports.UpdateInlineQuery = t.refinement(exports.Update, function (u) { return !!u.inline_query; }, 'UpdateInlineQuery');
exports.UpdateMessage = t.refinement(exports.Update, function (u) { return !!u.message; }, 'UpdateMessage');
exports.UpdateChosenInlineResult = t.refinement(exports.Update, function (u) { return !!u.chosen_inline_result; }, 'UpdateChosenInlineResult');
exports.UpdateCallbackQuery = t.refinement(exports.Update, function (u) { return !!u.callback_query; }, 'UpdateCallbackQuery');
exports.UpdatesState = t.struct({
    startDate: t.Number,
    offset: t.Number,
    updates: t.list(exports.Update)
});
exports.WebhookInfo = t.struct({
    url: t.String,
    has_custom_certificate: t.Boolean,
    pending_update_count: t.Number,
    last_error_date: t.maybe(t.Number),
    last_error_message: t.maybe(t.String)
});
exports.Request = t.struct({
    type: t.enums.of(['sink']),
    multipart: t.maybe(t.Boolean),
    method: t.String,
    returnType: t.maybe(t.String),
    options: t.Object
});
exports.WebhookResponse = t.struct({
    type: t.enums.of(['webhook']),
    update: exports.Update
});
//# sourceMappingURL=types.js.map