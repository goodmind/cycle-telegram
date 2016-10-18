"use strict";
var t = require("tcomb");
exports.PhotoSize = t.struct({
    file_id: t.String,
    width: t.Number,
    height: t.Number,
    file_size: t.maybe(t.Number)
});
exports.Audio = t.struct({
    file_id: t.String,
    duration: t.Number,
    performer: t.maybe(t.String),
    title: t.maybe(t.String),
    mime_type: t.maybe(t.String),
    file_size: t.maybe(t.Number)
});
exports.Document = t.struct({
    file_id: t.String,
    thumb: t.maybe(exports.PhotoSize),
    file_name: t.maybe(t.String),
    mime_type: t.maybe(t.String),
    file_size: t.maybe(t.Number)
});
exports.Sticker = t.struct({
    file_id: t.String,
    width: t.Number,
    height: t.Number,
    thumb: t.maybe(exports.PhotoSize),
    file_size: t.maybe(t.Number)
});
exports.Video = t.struct({
    file_id: t.String,
    width: t.Number,
    height: t.Number,
    duration: t.Number,
    thumb: t.maybe(exports.PhotoSize),
    mime_type: t.maybe(t.String),
    file_size: t.maybe(t.Number)
});
exports.Voice = t.struct({
    file_id: t.String,
    duration: t.Number,
    mime_type: t.maybe(t.String),
    file_size: t.maybe(t.Number)
});
exports.Contact = t.struct({
    phone_number: t.String,
    first_name: t.String,
    last_name: t.maybe(t.String),
    user_id: t.maybe(t.Number)
});
exports.Location = t.struct({
    longitude: t.Number,
    latitude: t.Number
});
exports.Venue = t.struct({
    location: exports.Location,
    title: t.String,
    address: t.String,
    foursquare_id: t.maybe(t.String)
});
exports.UserProfilePhotos = t.struct({
    total_count: t.Number,
    photos: t.list(t.list(exports.PhotoSize))
});
exports.File = t.struct({
    file_id: t.String,
    file_size: t.maybe(t.Number),
    file_path: t.maybe(t.String)
});
//# sourceMappingURL=multimedia-types.js.map