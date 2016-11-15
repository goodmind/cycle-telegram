"use strict";
var t = require("tcomb");
var k = require("./keyboard-types");
exports.InputTextMessageContent = t.struct({
    message_text: t.String,
    parse_mode: t.maybe(t.enums.of(['Markdown', 'HTML'])),
    disable_web_page_preview: t.maybe(t.Boolean)
});
exports.InputLocationMessageContent = t.struct({
    latitude: t.Number,
    longitude: t.Number
});
exports.InputVenueMessageContent = t.struct({
    latitude: t.Number,
    longitude: t.Number,
    title: t.String,
    address: t.String,
    foursquare_id: t.maybe(t.String)
});
exports.InputContactMessageContent = t.struct({
    phone_number: t.String,
    first_name: t.String,
    last_name: t.maybe(t.String)
});
exports.InputMessageContent = t.union([
    exports.InputTextMessageContent,
    exports.InputLocationMessageContent,
    exports.InputVenueMessageContent,
    exports.InputContactMessageContent
]);
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
exports.InlineQueryResultCachedGif = BaseInlineQuery({
    type: t.enums.of(['gif']),
    gif_file_id: t.String,
    title: t.maybe(t.String),
    caption: t.maybe(t.String)
});
exports.InlineQueryResultCachedMpeg4Gif = BaseInlineQuery({
    type: t.enums.of(['mpeg4_gif']),
    mpeg4_file_id: t.String,
    title: t.maybe(t.String),
    caption: t.maybe(t.String)
});
exports.InlineQueryResultCachedPhoto = BaseInlineQuery({
    type: t.enums.of(['photo']),
    photo_file_id: t.String,
    title: t.maybe(t.String),
    description: t.maybe(t.String),
    caption: t.maybe(t.String)
});
exports.InlineQueryResultCachedSticker = BaseInlineQuery({
    type: t.enums.of(['sticker']),
    sticker_file_id: t.String
});
exports.InlineQueryResultCachedVideo = BaseInlineQuery({
    type: t.enums.of(['video']),
    video_file_id: t.String,
    title: t.String,
    description: t.maybe(t.String),
    caption: t.maybe(t.String)
});
exports.InlineQueryResultCachedVoice = BaseInlineQuery({
    type: t.enums.of(['voice']),
    voice_file_id: t.String,
    title: t.String,
    caption: t.maybe(t.String)
});
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
exports.InlineQueryResultAudio = BaseInlineQuery({
    type: t.enums.of(['audio']),
    audio_url: t.String,
    title: t.String,
    performer: t.maybe(t.String),
    caption: t.maybe(t.String),
    audio_duration: t.maybe(t.Number)
});
exports.InlineQueryResultContact = BaseInlineQuery({
    type: t.enums.of(['contact']),
    phone_number: t.String,
    first_name: t.String,
    last_name: t.maybe(t.String),
    thumb_url: t.maybe(t.String),
    thumb_width: t.maybe(t.Number),
    thumb_height: t.maybe(t.Number)
});
exports.InlineQueryResultGame = BaseInlineQuery({
    type: t.enums.of(['game']),
    game_short_name: t.String
});
exports.InlineQueryResultDocument = BaseInlineQuery({
    type: t.enums.of(['document']),
    title: t.String,
    caption: t.maybe(t.String),
    document_url: t.String,
    description: t.maybe(t.String),
    thumb_url: t.maybe(t.String),
    thumb_width: t.maybe(t.Number),
    thumb_height: t.maybe(t.Number)
});
exports.InlineQueryResultGif = BaseInlineQuery({
    type: t.enums.of(['gif']),
    gif_url: t.String,
    gif_width: t.maybe(t.Number),
    gif_height: t.maybe(t.Number),
    thumb_url: t.String,
    title: t.maybe(t.String),
    caption: t.maybe(t.String)
});
exports.InlineQueryResultLocation = BaseInlineQuery({
    type: t.enums.of(['location']),
    latitude: t.Number,
    longitude: t.Number,
    title: t.String,
    thumb_url: t.maybe(t.String),
    thumb_width: t.maybe(t.Number),
    thumb_height: t.maybe(t.Number)
});
exports.InlineQueryResultMpeg4Gif = BaseInlineQuery({
    type: t.enums.of(['mpeg4_gif']),
    mpeg4_url: t.String,
    mpeg4_width: t.Number,
    mpeg4_height: t.Number,
    thumb_url: t.String,
    title: t.maybe(t.String),
    caption: t.maybe(t.String)
});
exports.InlineQueryResultPhoto = BaseInlineQuery({
    type: t.enums.of(['photo']),
    photo_url: t.String,
    thumb_url: t.String,
    photo_width: t.maybe(t.Number),
    photo_height: t.maybe(t.Number),
    title: t.maybe(t.String),
    description: t.maybe(t.String),
    caption: t.maybe(t.String)
});
exports.InlineQueryResultVenue = BaseInlineQuery({
    type: t.enums.of(['venue']),
    latitude: t.Number,
    longitude: t.Number,
    title: t.String,
    address: t.String,
    foursquare_id: t.maybe(t.String),
    thumb_url: t.maybe(t.String),
    thumb_width: t.maybe(t.Number),
    thumb_height: t.maybe(t.Number)
});
exports.InlineQueryResultVideo = BaseInlineQuery({
    type: t.enums.of(['video']),
    video_url: t.String,
    thumb_url: t.String,
    title: t.String,
    caption: t.maybe(t.String),
    video_width: t.maybe(t.Number),
    video_height: t.maybe(t.Number),
    video_duration: t.maybe(t.Number),
    description: t.maybe(t.String)
});
exports.InlineQueryResultVoice = BaseInlineQuery({
    type: t.enums.of(['voice']),
    voice_url: t.String,
    title: t.String,
    caption: t.maybe(t.String),
    voice_duration: t.maybe(t.Number)
});
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