'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForceReply = exports.CallbackQuery = exports.InlineKeyboardMarkup = exports.InlineKeyboardButton = exports.KeyboardButton = exports.ReplyKeyboardHide = exports.ReplyKeyboardMarkup = undefined;

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReplyKeyboardMarkup = exports.ReplyKeyboardMarkup = _tcomb2.default.struct({});

var ReplyKeyboardHide = exports.ReplyKeyboardHide = _tcomb2.default.struct({});

var KeyboardButton = exports.KeyboardButton = _tcomb2.default.struct({});

var InlineKeyboardButton = exports.InlineKeyboardButton = _tcomb2.default.struct({
  text: _tcomb2.default.String,
  url: _tcomb2.default.maybe(_tcomb2.default.String),
  callback_data: _tcomb2.default.maybe(_tcomb2.default.String),
  switch_inline_query: _tcomb2.default.maybe(_tcomb2.default.String)
});

var InlineKeyboardMarkup = exports.InlineKeyboardMarkup = _tcomb2.default.struct({
  inline_keyboard: _tcomb2.default.list(_tcomb2.default.list(InlineKeyboardButton))
});

var CallbackQuery = exports.CallbackQuery = _tcomb2.default.struct({});

var ForceReply = exports.ForceReply = _tcomb2.default.struct({});