'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = exports.UpdatesState = exports.Update = exports.Message = exports.MessageEntity = exports.InlineQueryResultArticle = exports.InlineQueryResult = exports.InputMessageContent = exports.ChosenInlineResult = exports.InlineQuery = exports.Chat = exports.User = undefined;

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

var _multimediaTypes = require('./multimedia-types');

var m = _interopRequireWildcard(_multimediaTypes);

var _keyboardTypes = require('./keyboard-types');

var k = _interopRequireWildcard(_keyboardTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = exports.User = _tcomb2.default.struct({
  id: _tcomb2.default.Number,
  first_name: _tcomb2.default.String,
  last_name: _tcomb2.default.maybe(_tcomb2.default.String),
  username: _tcomb2.default.maybe(_tcomb2.default.String)
});

var Chat = exports.Chat = _tcomb2.default.struct({
  id: _tcomb2.default.Number,
  type: _tcomb2.default.String,
  title: _tcomb2.default.maybe(_tcomb2.default.String),
  username: _tcomb2.default.maybe(_tcomb2.default.String),
  first_name: _tcomb2.default.maybe(_tcomb2.default.String),
  last_name: _tcomb2.default.maybe(_tcomb2.default.String)
});

var InlineQuery = exports.InlineQuery = _tcomb2.default.struct({
  id: _tcomb2.default.String,
  from: User,
  location: _tcomb2.default.maybe(m.Location),
  query: _tcomb2.default.String,
  offset: _tcomb2.default.String
});

var ChosenInlineResult = exports.ChosenInlineResult = _tcomb2.default.struct({
  result_id: _tcomb2.default.String,
  from: User,
  location: _tcomb2.default.maybe(m.Location),
  inline_message_id: _tcomb2.default.maybe(_tcomb2.default.String),
  query: _tcomb2.default.String
});

var InputMessageContent = exports.InputMessageContent = _tcomb2.default.struct({
  message_text: _tcomb2.default.String,
  parse_mode: _tcomb2.default.maybe(_tcomb2.default.String),
  disable_web_page_preview: _tcomb2.default.maybe(_tcomb2.default.Boolean)
});

var InlineQueryResult = exports.InlineQueryResult = _tcomb2.default.struct({});

var InlineQueryResultArticle = exports.InlineQueryResultArticle = InlineQueryResult.extend({
  type: _tcomb2.default.String,
  id: _tcomb2.default.String,
  title: _tcomb2.default.String,
  input_message_content: InputMessageContent,
  reply_markup: _tcomb2.default.maybe(k.InlineKeyboardMarkup),
  url: _tcomb2.default.maybe(_tcomb2.default.String),
  hide_url: _tcomb2.default.maybe(_tcomb2.default.Boolean),
  description: _tcomb2.default.maybe(_tcomb2.default.String),
  thumb_url: _tcomb2.default.maybe(_tcomb2.default.String),
  thumb_width: _tcomb2.default.maybe(_tcomb2.default.Number),
  thumb_height: _tcomb2.default.maybe(_tcomb2.default.Number)
});

var MessageEntity = exports.MessageEntity = _tcomb2.default.struct({
  type: _tcomb2.default.enums.of(['mention', 'hashtag', 'bot_command', 'url', 'email', 'bold', 'italic', 'code', 'pre', 'text_link']),
  offset: _tcomb2.default.Number,
  length: _tcomb2.default.Number,
  url: _tcomb2.default.maybe(_tcomb2.default.String)
});

var Message = exports.Message = _tcomb2.default.declare('Message');

Message.define(_tcomb2.default.struct({
  message_id: _tcomb2.default.Number,
  from: _tcomb2.default.maybe(User),
  date: _tcomb2.default.Number,
  chat: Chat,
  forward_from: _tcomb2.default.maybe(User),
  forward_date: _tcomb2.default.maybe(_tcomb2.default.Number),
  reply_to_message: _tcomb2.default.maybe(Message),
  text: _tcomb2.default.maybe(_tcomb2.default.String),
  entities: _tcomb2.default.maybe(_tcomb2.default.list(MessageEntity)),
  audio: _tcomb2.default.maybe(m.Audio),
  document: _tcomb2.default.maybe(m.Document),
  photo: _tcomb2.default.maybe(_tcomb2.default.list(m.PhotoSize)),
  sticker: _tcomb2.default.maybe(m.Sticker),
  video: _tcomb2.default.maybe(m.Video),
  voice: _tcomb2.default.maybe(m.Voice),
  caption: _tcomb2.default.maybe(_tcomb2.default.String),
  contact: _tcomb2.default.maybe(m.Contact),
  location: _tcomb2.default.maybe(m.Location),
  venue: _tcomb2.default.maybe(m.Venue),
  new_chat_member: _tcomb2.default.maybe(User),
  left_chat_member: _tcomb2.default.maybe(User),
  new_chat_title: _tcomb2.default.maybe(_tcomb2.default.String),
  new_chat_photo: _tcomb2.default.maybe(_tcomb2.default.list(m.PhotoSize)),
  delete_chat_photo: _tcomb2.default.maybe(_tcomb2.default.Boolean),
  group_chat_created: _tcomb2.default.maybe(_tcomb2.default.Boolean),
  supergroup_chat_created: _tcomb2.default.maybe(_tcomb2.default.Boolean),
  channel_chat_created: _tcomb2.default.maybe(_tcomb2.default.Boolean),
  migrate_to_chat_id: _tcomb2.default.maybe(_tcomb2.default.Number),
  migrate_from_chat_id: _tcomb2.default.maybe(_tcomb2.default.Number),
  pinned_message: _tcomb2.default.maybe(Message)
}));

var Update = exports.Update = _tcomb2.default.struct({
  update_id: _tcomb2.default.Number,
  message: _tcomb2.default.maybe(Message),
  inline_query: _tcomb2.default.maybe(InlineQuery),
  chosen_inline_result: _tcomb2.default.maybe(ChosenInlineResult),
  callback_query: _tcomb2.default.maybe(k.CallbackQuery)
});

var UpdatesState = exports.UpdatesState = _tcomb2.default.struct({
  startDate: _tcomb2.default.Number,
  offset: _tcomb2.default.Number,
  updates: _tcomb2.default.list(Update)
});

var Request = exports.Request = _tcomb2.default.struct({
  type: _tcomb2.default.enums.of(['sink']),
  method: _tcomb2.default.String,
  options: _tcomb2.default.Object
});