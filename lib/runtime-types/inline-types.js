"use strict";
var t = require("tcomb");
var k = require("./keyboard-types");
exports.InputMessageContent = t.struct({
    message_text: t.String,
    parse_mode: t.maybe(t.String),
    disable_web_page_preview: t.maybe(t.Boolean)
});
var BaseInlineQuery = function (props, name) {
    if (name === void 0) { name = 'Unknown'; }
    return t.struct(Object.assign({}, {
        type: t.String,
        id: t.String,
        reply_markup: t.maybe(k.InlineKeyboardMarkup),
        input_message_content: t.maybe(exports.InputMessageContent)
    }, props), name);
};
exports.InlineQueryResultCachedAudio = BaseInlineQuery({
    type: t.enums.of(['audio']),
    audio_file_id: t.String,
    caption: t.maybe(t.String)
});
exports.InlineQueryResultCachedDocument = BaseInlineQuery({
    type: t.enums.of(['document']),
    title: t.String,
    document_file_id: t.String,
    description: t.maybe(t.String),
    caption: t.maybe(t.String)
});
exports.InlineQueryResultCachedGif = BaseInlineQuery({});
exports.InlineQueryResultCachedMpeg4Gif = BaseInlineQuery({});
exports.InlineQueryResultCachedPhoto = BaseInlineQuery({});
exports.InlineQueryResultCachedSticker = BaseInlineQuery({});
exports.InlineQueryResultCachedVideo = BaseInlineQuery({});
exports.InlineQueryResultCachedVoice = BaseInlineQuery({});
exports.InlineQueryResultArticle = BaseInlineQuery({
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
exports.InlineQueryResultAudio = BaseInlineQuery({});
exports.InlineQueryResultContact = BaseInlineQuery({});
exports.InlineQueryResultGame = BaseInlineQuery({
    type: t.enums.of(['game']),
    game_short_name: t.String
});
exports.InlineQueryResultDocument = BaseInlineQuery({});
exports.InlineQueryResultGif = BaseInlineQuery({});
exports.InlineQueryResultLocation = BaseInlineQuery({});
exports.InlineQueryResultMpeg4Gif = BaseInlineQuery({});
exports.InlineQueryResultPhoto = BaseInlineQuery({});
exports.InlineQueryResultVenue = BaseInlineQuery({});
exports.InlineQueryResultVideo = BaseInlineQuery({});
exports.InlineQueryResultVoice = BaseInlineQuery({});
exports.InlineQueryResult = t.union([
    exports.InlineQueryResultCachedAudio,
    exports.InlineQueryResultCachedDocument,
    exports.InlineQueryResultCachedGif,
    exports.InlineQueryResultCachedMpeg4Gif,
    exports.InlineQueryResultCachedPhoto,
    exports.InlineQueryResultCachedSticker,
    exports.InlineQueryResultCachedVideo,
    exports.InlineQueryResultCachedVoice,
    exports.InlineQueryResultArticle,
    exports.InlineQueryResultAudio,
    exports.InlineQueryResultContact,
    exports.InlineQueryResultGame,
    exports.InlineQueryResultDocument,
    exports.InlineQueryResultGif,
    exports.InlineQueryResultLocation,
    exports.InlineQueryResultMpeg4Gif,
    exports.InlineQueryResultPhoto,
    exports.InlineQueryResultVenue,
    exports.InlineQueryResultVideo,
    exports.InlineQueryResultVoice
]);
//# sourceMappingURL=inline-types.js.map