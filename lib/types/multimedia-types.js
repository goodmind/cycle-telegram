'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.File = exports.UserProfilePhotos = exports.Venue = exports.Location = exports.Contact = exports.Voice = exports.Video = exports.Sticker = exports.Document = exports.Audio = exports.PhotoSize = undefined;

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhotoSize = exports.PhotoSize = _tcomb2.default.struct({
  file_id: _tcomb2.default.String,
  width: _tcomb2.default.Number,
  height: _tcomb2.default.Number,
  file_size: _tcomb2.default.maybe(_tcomb2.default.Number)
});

var Audio = exports.Audio = _tcomb2.default.struct({
  file_id: _tcomb2.default.String,
  duration: _tcomb2.default.Number,
  performer: _tcomb2.default.maybe(_tcomb2.default.String),
  title: _tcomb2.default.maybe(_tcomb2.default.String),
  mime_type: _tcomb2.default.maybe(_tcomb2.default.String),
  file_size: _tcomb2.default.maybe(_tcomb2.default.Number)
});

var Document = exports.Document = _tcomb2.default.struct({
  file_id: _tcomb2.default.String,
  thumb: _tcomb2.default.maybe(PhotoSize),
  file_name: _tcomb2.default.maybe(_tcomb2.default.String),
  mime_type: _tcomb2.default.maybe(_tcomb2.default.String),
  file_size: _tcomb2.default.maybe(_tcomb2.default.Number)
});

var Sticker = exports.Sticker = _tcomb2.default.struct({
  file_id: _tcomb2.default.String,
  width: _tcomb2.default.Number,
  height: _tcomb2.default.Number,
  thumb: _tcomb2.default.maybe(PhotoSize),
  file_size: _tcomb2.default.maybe(_tcomb2.default.Number)
});

var Video = exports.Video = _tcomb2.default.struct({
  file_id: _tcomb2.default.String,
  width: _tcomb2.default.Number,
  height: _tcomb2.default.Number,
  duration: _tcomb2.default.Number,
  thumb: _tcomb2.default.maybe(PhotoSize),
  mime_type: _tcomb2.default.maybe(_tcomb2.default.String),
  file_size: _tcomb2.default.maybe(_tcomb2.default.Number)
});

var Voice = exports.Voice = _tcomb2.default.struct({
  file_id: _tcomb2.default.String,
  duration: _tcomb2.default.Number,
  mime_type: _tcomb2.default.maybe(_tcomb2.default.String),
  file_size: _tcomb2.default.maybe(_tcomb2.default.Number)
});

var Contact = exports.Contact = _tcomb2.default.struct({
  phone_number: _tcomb2.default.String,
  first_name: _tcomb2.default.String,
  last_name: _tcomb2.default.maybe(_tcomb2.default.String),
  user_id: _tcomb2.default.maybe(_tcomb2.default.Number)
});

var Location = exports.Location = _tcomb2.default.struct({
  longitude: _tcomb2.default.Number,
  latitude: _tcomb2.default.Number
});

var Venue = exports.Venue = _tcomb2.default.struct({
  location: Location,
  title: _tcomb2.default.String,
  address: _tcomb2.default.String,
  foursquare_id: _tcomb2.default.maybe(_tcomb2.default.String)
});

var UserProfilePhotos = exports.UserProfilePhotos = _tcomb2.default.struct({
  total_count: _tcomb2.default.Number,
  photos: _tcomb2.default.list(_tcomb2.default.list(PhotoSize))
});

var File = exports.File = _tcomb2.default.struct({
  file_id: _tcomb2.default.String,
  file_size: _tcomb2.default.maybe(_tcomb2.default.Number),
  file_path: _tcomb2.default.maybe(_tcomb2.default.String)
});