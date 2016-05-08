'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForceReply = exports.InlineKeyboardMarkup = exports.InlineKeyboardButton = exports.ReplyKeyboardHide = exports.ReplyKeyboardMarkup = exports.KeyboardButton = undefined;

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeyboardButton = exports.KeyboardButton = _tcomb2.default.struct({
  text: _tcomb2.default.String,
  request_contact: _tcomb2.default.maybe(_tcomb2.default.Boolean),
  request_location: _tcomb2.default.maybe(_tcomb2.default.Boolean)
});

var ReplyKeyboardMarkup = exports.ReplyKeyboardMarkup = _tcomb2.default.struct({
  keyboard: _tcomb2.default.list(_tcomb2.default.list(KeyboardButton)),
  resize_keyboard: _tcomb2.default.maybe(_tcomb2.default.Boolean),
  one_time_keyboard: _tcomb2.default.maybe(_tcomb2.default.Boolean),
  selective: _tcomb2.default.maybe(_tcomb2.default.Boolean)
});

var ReplyKeyboardHide = exports.ReplyKeyboardHide = _tcomb2.default.struct({
  hide_keyboard: _tcomb2.default.Boolean,
  selective: _tcomb2.default.maybe(_tcomb2.default.Boolean)
});

var InlineKeyboardButton = exports.InlineKeyboardButton = _tcomb2.default.struct({
  text: _tcomb2.default.String,
  url: _tcomb2.default.maybe(_tcomb2.default.String),
  callback_data: _tcomb2.default.maybe(_tcomb2.default.String),
  switch_inline_query: _tcomb2.default.maybe(_tcomb2.default.String)
});

var InlineKeyboardMarkup = exports.InlineKeyboardMarkup = _tcomb2.default.struct({
  inline_keyboard: _tcomb2.default.list(_tcomb2.default.list(InlineKeyboardButton))
});

var ForceReply = exports.ForceReply = _tcomb2.default.struct({
  force_reply: _tcomb2.default.Boolean,
  selective: _tcomb2.default.maybe(_tcomb2.default.Boolean)
});