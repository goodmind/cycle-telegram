'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editMessageReplyMarkup = exports.editMessageCaption = exports.editMessageText = exports.answerCallbackQuery = exports.getChatMember = exports.getChatMembersCount = exports.getChatAdministrators = exports.getChat = exports.unbanChatMember = exports.leaveChat = exports.getFile = exports.getUserProfilePhotos = exports.sendContact = exports.sendVenue = exports.sendLocation = exports.sendVoice = exports.sendVideo = exports.sendSticker = exports.sendDocument = exports.sendAudio = exports.sendPhoto = exports.forwardMessage = exports.answerInlineQuery = exports.reply = exports.broadcast = exports.webhook = exports.setWebhook = undefined;

var _types = require('../types');

var _ramda = require('ramda');

var _helpers = require('../helpers');

var setWebhook = exports.setWebhook = function setWebhook() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return (0, _types.Request)({
    type: 'sink',
    method: 'setWebhook',
    options: options
  });
};

var webhook = exports.webhook = function webhook(update) {
  return (0, _types.WebhookResponse)({
    type: 'webhook',
    update: update
  });
};

var broadcast = exports.broadcast = (0, _ramda.curryN)(2, function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var update = arguments[1];
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendMessage',
    options: (0, _helpers.defaults)({
      chat_id: (0, _ramda.defaultTo)((0, _ramda.path)(['message', 'chat', 'id'], update)),
      text: (0, _ramda.defaultTo)('Null-catch: no text provided'),
      reply_markup: JSON.stringify
    }, options)
  });
});

var reply = exports.reply = (0, _ramda.curryN)(2, function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var update = arguments[1];
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendMessage',
    options: (0, _helpers.defaults)({
      chat_id: (0, _ramda.defaultTo)((0, _ramda.path)(['message', 'chat', 'id'], update)),
      reply_to_message_id: (0, _ramda.defaultTo)((0, _ramda.path)(['message', 'message_id'], update)),
      text: (0, _ramda.defaultTo)('Null-catch: no text provided'),
      reply_markup: JSON.stringify
    }, (0, _ramda.is)(String, options) ? { text: options } : options)
  });
});

var answerInlineQuery = exports.answerInlineQuery = (0, _ramda.curryN)(2, function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var update = arguments[1];

  var updateResults = function updateResults(results) {
    return results[0].id ? results : (0, _ramda.map)(function (answer) {
      return (0, _ramda.assoc)('id', Math.random().toString(36).substring(2), answer);
    }, results || []);
  };

  return (0, _types.Request)({
    type: 'sink',
    method: 'answerInlineQuery',
    options: (0, _helpers.defaults)({
      inline_query_id: (0, _ramda.defaultTo)((0, _ramda.path)(['inline_query', 'id'], update)),
      results: (0, _ramda.compose)(JSON.stringify, updateResults)
    }, (0, _ramda.isArrayLike)(options) ? { results: options } : options)
  });
});

var forwardMessage = exports.forwardMessage = (0, _ramda.curryN)(2, function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref.chat_id;
  var from_chat_id = _ref.from_chat_id;
  var _ref$disable_notifica = _ref.disable_notification;
  var disable_notification = _ref$disable_notifica === undefined ? null : _ref$disable_notifica;
  var message_id = _ref.message_id;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    from_chat_id: from_chat_id,
    disable_notification: disable_notification,
    message_id: message_id
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'forwardMessage',
    options: options
  });
});

var sendPhoto = exports.sendPhoto = (0, _ramda.curryN)(2, function () {
  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref2.chat_id;
  var photo = _ref2.photo;
  var _ref2$caption = _ref2.caption;
  var caption = _ref2$caption === undefined ? null : _ref2$caption;
  var _ref2$disable_notific = _ref2.disable_notification;
  var disable_notification = _ref2$disable_notific === undefined ? null : _ref2$disable_notific;
  var _ref2$reply_to_messag = _ref2.reply_to_message_id;
  var reply_to_message_id = _ref2$reply_to_messag === undefined ? null : _ref2$reply_to_messag;
  var _ref2$reply_markup = _ref2.reply_markup;
  var reply_markup = _ref2$reply_markup === undefined ? null : _ref2$reply_markup;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    photo: photo,
    caption: caption,
    disable_notification: disable_notification,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendPhoto',
    options: options
  });
});

var sendAudio = exports.sendAudio = (0, _ramda.curryN)(2, function () {
  var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref3.chat_id;
  var audio = _ref3.audio;
  var _ref3$duration = _ref3.duration;
  var duration = _ref3$duration === undefined ? null : _ref3$duration;
  var _ref3$performer = _ref3.performer;
  var performer = _ref3$performer === undefined ? null : _ref3$performer;
  var _ref3$title = _ref3.title;
  var title = _ref3$title === undefined ? null : _ref3$title;
  var _ref3$disable_notific = _ref3.disable_notification;
  var disable_notification = _ref3$disable_notific === undefined ? null : _ref3$disable_notific;
  var _ref3$reply_to_messag = _ref3.reply_to_message_id;
  var reply_to_message_id = _ref3$reply_to_messag === undefined ? null : _ref3$reply_to_messag;
  var _ref3$reply_markup = _ref3.reply_markup;
  var reply_markup = _ref3$reply_markup === undefined ? null : _ref3$reply_markup;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    audio: audio,
    duration: duration,
    performer: performer,
    title: title,
    disable_notification: disable_notification,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendAudio',
    options: options
  });
});

var sendDocument = exports.sendDocument = (0, _ramda.curryN)(2, function () {
  var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref4.chat_id;
  var document = _ref4.document;
  var _ref4$caption = _ref4.caption;
  var caption = _ref4$caption === undefined ? null : _ref4$caption;
  var _ref4$disable_notific = _ref4.disable_notification;
  var disable_notification = _ref4$disable_notific === undefined ? null : _ref4$disable_notific;
  var _ref4$reply_to_messag = _ref4.reply_to_message_id;
  var reply_to_message_id = _ref4$reply_to_messag === undefined ? null : _ref4$reply_to_messag;
  var _ref4$reply_markup = _ref4.reply_markup;
  var reply_markup = _ref4$reply_markup === undefined ? null : _ref4$reply_markup;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    document: document,
    caption: caption,
    disable_notification: disable_notification,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendDocument',
    options: options
  });
});

var sendSticker = exports.sendSticker = (0, _ramda.curryN)(2, function () {
  var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref5.chat_id;
  var sticker = _ref5.sticker;
  var _ref5$disable_notific = _ref5.disable_notification;
  var disable_notification = _ref5$disable_notific === undefined ? null : _ref5$disable_notific;
  var _ref5$reply_to_messag = _ref5.reply_to_message_id;
  var reply_to_message_id = _ref5$reply_to_messag === undefined ? null : _ref5$reply_to_messag;
  var _ref5$reply_markup = _ref5.reply_markup;
  var reply_markup = _ref5$reply_markup === undefined ? null : _ref5$reply_markup;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    sticker: sticker,
    disable_notification: disable_notification,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendSticker',
    options: options
  });
});

var sendVideo = exports.sendVideo = (0, _ramda.curryN)(2, function () {
  var _ref6 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref6.chat_id;
  var video = _ref6.video;
  var _ref6$duration = _ref6.duration;
  var duration = _ref6$duration === undefined ? null : _ref6$duration;
  var _ref6$width = _ref6.width;
  var width = _ref6$width === undefined ? null : _ref6$width;
  var _ref6$height = _ref6.height;
  var height = _ref6$height === undefined ? null : _ref6$height;
  var _ref6$caption = _ref6.caption;
  var caption = _ref6$caption === undefined ? null : _ref6$caption;
  var _ref6$disable_notific = _ref6.disable_notification;
  var disable_notification = _ref6$disable_notific === undefined ? null : _ref6$disable_notific;
  var _ref6$reply_to_messag = _ref6.reply_to_message_id;
  var reply_to_message_id = _ref6$reply_to_messag === undefined ? null : _ref6$reply_to_messag;
  var _ref6$reply_markup = _ref6.reply_markup;
  var reply_markup = _ref6$reply_markup === undefined ? null : _ref6$reply_markup;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    video: video,
    duration: duration,
    width: width,
    height: height,
    caption: caption,
    disable_notification: disable_notification,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendVideo',
    options: options
  });
});

var sendVoice = exports.sendVoice = (0, _ramda.curryN)(2, function () {
  var _ref7 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref7.chat_id;
  var voice = _ref7.voice;
  var _ref7$duration = _ref7.duration;
  var duration = _ref7$duration === undefined ? null : _ref7$duration;
  var _ref7$disable_notific = _ref7.disable_notification;
  var disable_notification = _ref7$disable_notific === undefined ? null : _ref7$disable_notific;
  var _ref7$reply_to_messag = _ref7.reply_to_message_id;
  var reply_to_message_id = _ref7$reply_to_messag === undefined ? null : _ref7$reply_to_messag;
  var _ref7$reply_markup = _ref7.reply_markup;
  var reply_markup = _ref7$reply_markup === undefined ? null : _ref7$reply_markup;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    voice: voice,
    duration: duration,
    disable_notification: disable_notification,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendVoice',
    options: options
  });
});

var sendLocation = exports.sendLocation = (0, _ramda.curryN)(2, function () {
  var _ref8 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref8.chat_id;
  var latitude = _ref8.latitude;
  var longitude = _ref8.longitude;
  var _ref8$disable_notific = _ref8.disable_notification;
  var disable_notification = _ref8$disable_notific === undefined ? null : _ref8$disable_notific;
  var _ref8$reply_to_messag = _ref8.reply_to_message_id;
  var reply_to_message_id = _ref8$reply_to_messag === undefined ? null : _ref8$reply_to_messag;
  var _ref8$reply_markup = _ref8.reply_markup;
  var reply_markup = _ref8$reply_markup === undefined ? null : _ref8$reply_markup;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    latitude: latitude,
    longitude: longitude,
    disable_notification: disable_notification,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendLocation',
    options: options
  });
});

var sendVenue = exports.sendVenue = (0, _ramda.curryN)(2, function () {
  var _ref9 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref9.chat_id;
  var latitude = _ref9.latitude;
  var longitude = _ref9.longitude;
  var title = _ref9.title;
  var address = _ref9.address;
  var _ref9$foursquare_id = _ref9.foursquare_id;
  var foursquare_id = _ref9$foursquare_id === undefined ? null : _ref9$foursquare_id;
  var _ref9$disable_notific = _ref9.disable_notification;
  var disable_notification = _ref9$disable_notific === undefined ? null : _ref9$disable_notific;
  var _ref9$reply_to_messag = _ref9.reply_to_message_id;
  var reply_to_message_id = _ref9$reply_to_messag === undefined ? null : _ref9$reply_to_messag;
  var _ref9$reply_markup = _ref9.reply_markup;
  var reply_markup = _ref9$reply_markup === undefined ? null : _ref9$reply_markup;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    latitude: latitude,
    longitude: longitude,
    title: title,
    address: address,
    foursquare_id: foursquare_id,
    disable_notification: disable_notification,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendVenue',
    options: options
  });
});

var sendContact = exports.sendContact = (0, _ramda.curryN)(2, function () {
  var _ref10 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref10.chat_id;
  var phone_number = _ref10.phone_number;
  var first_name = _ref10.first_name;
  var _ref10$last_name = _ref10.last_name;
  var last_name = _ref10$last_name === undefined ? null : _ref10$last_name;
  var _ref10$disable_notifi = _ref10.disable_notification;
  var disable_notification = _ref10$disable_notifi === undefined ? null : _ref10$disable_notifi;
  var _ref10$reply_to_messa = _ref10.reply_to_message_id;
  var reply_to_message_id = _ref10$reply_to_messa === undefined ? null : _ref10$reply_to_messa;
  var _ref10$reply_markup = _ref10.reply_markup;
  var reply_markup = _ref10$reply_markup === undefined ? null : _ref10$reply_markup;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    phone_number: phone_number,
    first_name: first_name,
    last_name: last_name,
    disable_notification: disable_notification,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendContact',
    options: options
  });
});

var getUserProfilePhotos = exports.getUserProfilePhotos = (0, _ramda.curryN)(2, function () {
  var _ref11 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var user_id = _ref11.user_id;
  var _ref11$offset = _ref11.offset;
  var offset = _ref11$offset === undefined ? null : _ref11$offset;
  var _ref11$limit = _ref11.limit;
  var limit = _ref11$limit === undefined ? null : _ref11$limit;
  var update = arguments[1];

  var options = {
    user_id: user_id,
    offset: offset,
    limit: limit
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'getUserProfilePhotos',
    options: options
  });
});

var getFile = exports.getFile = (0, _ramda.curryN)(2, function () {
  var _ref12 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var file_id = _ref12.file_id;
  var update = arguments[1];

  var options = {
    file_id: file_id
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'getFile',
    options: options
  });
});

var leaveChat = exports.leaveChat = (0, _ramda.curryN)(2, function () {
  var _ref13 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref13.chat_id;
  var update = arguments[1];

  var options = {
    chat_id: chat_id
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'leaveChat',
    options: options
  });
});

var unbanChatMember = exports.unbanChatMember = (0, _ramda.curryN)(2, function () {
  var _ref14 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref14.chat_id;
  var user_id = _ref14.user_id;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    user_id: user_id
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'unbanChatMember',
    options: options
  });
});

var getChat = exports.getChat = (0, _ramda.curryN)(2, function () {
  var _ref15 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref15.chat_id;
  var update = arguments[1];

  var options = {
    chat_id: chat_id
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'getChat',
    options: options
  });
});

var getChatAdministrators = exports.getChatAdministrators = (0, _ramda.curryN)(2, function () {
  var _ref16 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref16.chat_id;
  var update = arguments[1];

  var options = {
    chat_id: chat_id
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'getChatAdministrators',
    options: options
  });
});

var getChatMembersCount = exports.getChatMembersCount = (0, _ramda.curryN)(2, function () {
  var _ref17 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref17.chat_id;
  var update = arguments[1];

  var options = {
    chat_id: chat_id
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'getChatMembersCount',
    options: options
  });
});

var getChatMember = exports.getChatMember = (0, _ramda.curryN)(2, function () {
  var _ref18 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var chat_id = _ref18.chat_id;
  var user_id = _ref18.user_id;
  var update = arguments[1];

  var options = {
    chat_id: chat_id,
    user_id: user_id
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'getChatMember',
    options: options
  });
});

var answerCallbackQuery = exports.answerCallbackQuery = (0, _ramda.curryN)(2, function () {
  var _ref19 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var callback_query_id = _ref19.callback_query_id;
  var _ref19$text = _ref19.text;
  var text = _ref19$text === undefined ? null : _ref19$text;
  var _ref19$show_alert = _ref19.show_alert;
  var show_alert = _ref19$show_alert === undefined ? null : _ref19$show_alert;
  var update = arguments[1];

  var options = {
    callback_query_id: callback_query_id,
    text: text,
    show_alert: show_alert
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'answerCallbackQuery',
    options: options
  });
});

var editMessageText = exports.editMessageText = (0, _ramda.curryN)(2, function () {
  var _ref20 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var text = _ref20.text;
  var _ref20$parse_mode = _ref20.parse_mode;
  var parse_mode = _ref20$parse_mode === undefined ? null : _ref20$parse_mode;
  var _ref20$disable_web_pa = _ref20.disable_web_page_preview;
  var disable_web_page_preview = _ref20$disable_web_pa === undefined ? null : _ref20$disable_web_pa;
  var _ref20$reply_markup = _ref20.reply_markup;
  var reply_markup = _ref20$reply_markup === undefined ? null : _ref20$reply_markup;
  var update = arguments[1];

  var options = {
    text: text,
    parse_mode: parse_mode,
    disable_web_page_preview: disable_web_page_preview,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'editMessageText',
    options: options
  });
});

var editMessageCaption = exports.editMessageCaption = (0, _ramda.curryN)(2, function () {
  var _ref21 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref21$caption = _ref21.caption;
  var caption = _ref21$caption === undefined ? null : _ref21$caption;
  var _ref21$reply_markup = _ref21.reply_markup;
  var reply_markup = _ref21$reply_markup === undefined ? null : _ref21$reply_markup;
  var update = arguments[1];

  var options = {
    caption: caption,
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'editMessageCaption',
    options: options
  });
});

var editMessageReplyMarkup = exports.editMessageReplyMarkup = (0, _ramda.curryN)(2, function () {
  var _ref22 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref22$reply_markup = _ref22.reply_markup;
  var reply_markup = _ref22$reply_markup === undefined ? null : _ref22$reply_markup;
  var update = arguments[1];

  var options = {
    reply_markup: reply_markup
  };
  return (0, _types.Request)({
    type: 'sink',
    method: 'editMessageReplyMarkup',
    options: options
  });
});