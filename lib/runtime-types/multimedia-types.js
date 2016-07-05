"use strict";
var tcomb_1 = require('tcomb');
exports.PhotoSize = tcomb_1.default.struct({
    file_id: tcomb_1.default.String,
    width: tcomb_1.default.Number,
    height: tcomb_1.default.Number,
    file_size: tcomb_1.default.maybe(tcomb_1.default.Number)
});
exports.Audio = tcomb_1.default.struct({
    file_id: tcomb_1.default.String,
    duration: tcomb_1.default.Number,
    performer: tcomb_1.default.maybe(tcomb_1.default.String),
    title: tcomb_1.default.maybe(tcomb_1.default.String),
    mime_type: tcomb_1.default.maybe(tcomb_1.default.String),
    file_size: tcomb_1.default.maybe(tcomb_1.default.Number)
});
exports.Document = tcomb_1.default.struct({
    file_id: tcomb_1.default.String,
    thumb: tcomb_1.default.maybe(exports.PhotoSize),
    file_name: tcomb_1.default.maybe(tcomb_1.default.String),
    mime_type: tcomb_1.default.maybe(tcomb_1.default.String),
    file_size: tcomb_1.default.maybe(tcomb_1.default.Number)
});
exports.Sticker = tcomb_1.default.struct({
    file_id: tcomb_1.default.String,
    width: tcomb_1.default.Number,
    height: tcomb_1.default.Number,
    thumb: tcomb_1.default.maybe(exports.PhotoSize),
    file_size: tcomb_1.default.maybe(tcomb_1.default.Number)
});
exports.Video = tcomb_1.default.struct({
    file_id: tcomb_1.default.String,
    width: tcomb_1.default.Number,
    height: tcomb_1.default.Number,
    duration: tcomb_1.default.Number,
    thumb: tcomb_1.default.maybe(exports.PhotoSize),
    mime_type: tcomb_1.default.maybe(tcomb_1.default.String),
    file_size: tcomb_1.default.maybe(tcomb_1.default.Number)
});
exports.Voice = tcomb_1.default.struct({
    file_id: tcomb_1.default.String,
    duration: tcomb_1.default.Number,
    mime_type: tcomb_1.default.maybe(tcomb_1.default.String),
    file_size: tcomb_1.default.maybe(tcomb_1.default.Number)
});
exports.Contact = tcomb_1.default.struct({
    phone_number: tcomb_1.default.String,
    first_name: tcomb_1.default.String,
    last_name: tcomb_1.default.maybe(tcomb_1.default.String),
    user_id: tcomb_1.default.maybe(tcomb_1.default.Number)
});
exports.Location = tcomb_1.default.struct({
    longitude: tcomb_1.default.Number,
    latitude: tcomb_1.default.Number
});
exports.Venue = tcomb_1.default.struct({
    location: exports.Location,
    title: tcomb_1.default.String,
    address: tcomb_1.default.String,
    foursquare_id: tcomb_1.default.maybe(tcomb_1.default.String)
});
exports.UserProfilePhotos = tcomb_1.default.struct({
    total_count: tcomb_1.default.Number,
    photos: tcomb_1.default.list(tcomb_1.default.list(exports.PhotoSize))
});
exports.File = tcomb_1.default.struct({
    file_id: tcomb_1.default.String,
    file_size: tcomb_1.default.maybe(tcomb_1.default.Number),
    file_path: tcomb_1.default.maybe(tcomb_1.default.String)
});
//# sourceMappingURL=multimedia-types.js.map