"use strict";
var t = require("tcomb");
var k = require("./keyboard-types");
exports.InputMessageContent = t.struct({
    message_text: t.String,
    parse_mode: t.maybe(t.String),
    disable_web_page_preview: t.maybe(t.Boolean)
});
exports.InlineQueryResult = t.struct({
    type: t.String,
    id: t.String,
    reply_markup: t.maybe(k.InlineKeyboardMarkup),
    input_message_content: t.maybe(exports.InputMessageContent)
});
exports.InlineQueryResultCachedAudio = exports.InlineQueryResult.extend({
    type: t.enums.of(['audio']),
    audio_file_id: t.String,
    caption: t.maybe(t.String)
});
exports.InlineQueryResultCachedDocument = exports.InlineQueryResult.extend({
    type: t.enums.of(['document']),
    title: t.String,
    document_file_id: t.String,
    description: t.maybe(t.String),
    caption: t.maybe(t.String)
});
exports.InlineQueryResultCachedGif = exports.InlineQueryResult.extend({});
exports.InlineQueryResultCachedMpeg4Gif = exports.InlineQueryResult.extend({});
exports.InlineQueryResultCachedPhoto = exports.InlineQueryResult.extend({});
exports.InlineQueryResultCachedSticker = exports.InlineQueryResult.extend({});
exports.InlineQueryResultCachedVideo = exports.InlineQueryResult.extend({});
exports.InlineQueryResultCachedVoice = exports.InlineQueryResult.extend({});
exports.InlineQueryResultArticle = exports.InlineQueryResult.extend({
    type: t.enums.of(['article']),
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
exports.InlineQueryResultAudio = exports.InlineQueryResult.extend({});
exports.InlineQueryResultContact = exports.InlineQueryResult.extend({});
exports.InlineQueryResultGame = exports.InlineQueryResult.extend({});
exports.InlineQueryResultDocument = exports.InlineQueryResult.extend({});
exports.InlineQueryResultGif = exports.InlineQueryResult.extend({});
exports.InlineQueryResultLocation = exports.InlineQueryResult.extend({});
exports.InlineQueryResultMpeg4Gif = exports.InlineQueryResult.extend({});
exports.InlineQueryResultPhoto = exports.InlineQueryResult.extend({});
exports.InlineQueryResultVenue = exports.InlineQueryResult.extend({});
exports.InlineQueryResultVideo = exports.InlineQueryResult.extend({});
exports.InlineQueryResultVoice = exports.InlineQueryResult.extend({});
//# sourceMappingURL=inline-types.js.map