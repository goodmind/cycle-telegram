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
}; /*eslint camelcase: ["off"]*/

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZWxlZ3JhbS1kcml2ZXIvc2lua3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQU9BOztBQUVPLElBQUksa0NBQWEsU0FBYixVQUFhO0FBQUEsTUFBQyxPQUFELHlEQUFXLEVBQVg7QUFBQSxTQUFrQixvQkFBUTtBQUNoRCxVQUFNLE1BRDBDO0FBRWhELFlBQVEsWUFGd0M7QUFHaEQ7QUFIZ0QsR0FBUixDQUFsQjtBQUFBLENBQWpCLEM7O0FBTUEsSUFBSSw0QkFBVSxTQUFWLE9BQVUsQ0FBQyxNQUFEO0FBQUEsU0FBWSw0QkFBZ0I7QUFDL0MsVUFBTSxTQUR5QztBQUUvQztBQUYrQyxHQUFoQixDQUFaO0FBQUEsQ0FBZDs7QUFLQSxJQUFJLGdDQUFZLG1CQUFPLENBQVAsRUFBVTtBQUFBLE1BQUMsT0FBRCx5REFBVyxFQUFYO0FBQUEsTUFBZSxNQUFmO0FBQUEsU0FBMEIsb0JBQVE7QUFDakUsVUFBTSxNQUQyRDtBQUVqRSxZQUFRLGFBRnlEO0FBR2pFLGFBQVMsdUJBQVM7QUFDaEIsZUFBUyxzQkFBVSxpQkFBSyxDQUFDLFNBQUQsRUFBWSxNQUFaLEVBQW9CLElBQXBCLENBQUwsRUFBZ0MsTUFBaEMsQ0FBVixDQURPO0FBRWhCLFlBQU0sc0JBQVUsOEJBQVYsQ0FGVTtBQUdoQixvQkFBYyxLQUFLO0FBSEgsS0FBVCxFQUlOLE9BSk07QUFId0QsR0FBUixDQUExQjtBQUFBLENBQVYsQ0FBaEI7O0FBVUEsSUFBSSx3QkFBUSxtQkFBTyxDQUFQLEVBQVU7QUFBQSxNQUFDLE9BQUQseURBQVcsRUFBWDtBQUFBLE1BQWUsTUFBZjtBQUFBLFNBQTBCLG9CQUFRO0FBQzdELFVBQU0sTUFEdUQ7QUFFN0QsWUFBUSxhQUZxRDtBQUc3RCxhQUFTLHVCQUFTO0FBQ2hCLGVBQVMsc0JBQVUsaUJBQUssQ0FBQyxTQUFELEVBQVksTUFBWixFQUFvQixJQUFwQixDQUFMLEVBQWdDLE1BQWhDLENBQVYsQ0FETztB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QUFXOztBQUNqQixNQUFJLFVBQVU7QUFDWjtBQURZLEdBQWQ7QUFHQSxTQUFPLG9CQUFRO0FBQ2IsVUFBTSxNQURPO0FBRWIsWUFBUSx3QkFGSztBQUdiO0FBSGEsR0FBUixDQUFQO0FBS0QsQ0FYbUMsQ0FBN0IiLCJmaWxlIjoic2lua3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludCBjYW1lbGNhc2U6IFtcIm9mZlwiXSovXG5cbmltcG9ydCB7IFJlcXVlc3QsIFdlYmhvb2tSZXNwb25zZSB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHtcbiAgbWFwLCBhc3NvYyxcbiAgY3VycnlOLCBwYXRoLFxuICBkZWZhdWx0VG8sXG4gIGNvbXBvc2UsXG4gIGlzLCBpc0FycmF5TGlrZVxufSBmcm9tICdyYW1kYSdcbmltcG9ydCB7IGRlZmF1bHRzIH0gZnJvbSAnLi4vaGVscGVycydcblxuZXhwb3J0IGxldCBzZXRXZWJob29rID0gKG9wdGlvbnMgPSB7fSkgPT4gUmVxdWVzdCh7XG4gIHR5cGU6ICdzaW5rJyxcbiAgbWV0aG9kOiAnc2V0V2ViaG9vaycsXG4gIG9wdGlvbnNcbn0pXG5cbmV4cG9ydCBsZXQgd2ViaG9vayA9ICh1cGRhdGUpID0+IFdlYmhvb2tSZXNwb25zZSh7XG4gIHR5cGU6ICd3ZWJob29rJyxcbiAgdXBkYXRlXG59KVxuXG5leHBvcnQgbGV0IGJyb2FkY2FzdCA9IGN1cnJ5TigyLCAob3B0aW9ucyA9IHt9LCB1cGRhdGUpID0+IFJlcXVlc3Qoe1xuICB0eXBlOiAnc2luaycsXG4gIG1ldGhvZDogJ3NlbmRNZXNzYWdlJyxcbiAgb3B0aW9uczogZGVmYXVsdHMoe1xuICAgIGNoYXRfaWQ6IGRlZmF1bHRUbyhwYXRoKFsnbWVzc2FnZScsICdjaGF0JywgJ2lkJ10sIHVwZGF0ZSkpLFxuICAgIHRleHQ6IGRlZmF1bHRUbygnTnVsbC1jYXRjaDogbm8gdGV4dCBwcm92aWRlZCcpLFxuICAgIHJlcGx5X21hcmt1cDogSlNPTi5zdHJpbmdpZnlcbiAgfSwgb3B0aW9ucylcbn0pKVxuXG5leHBvcnQgbGV0IHJlcGx5ID0gY3VycnlOKDIsIChvcHRpb25zID0ge30sIHVwZGF0ZSkgPT4gUmVxdWVzdCh7XG4gIHR5cGU6ICdzaW5rJyxcbiAgbWV0aG9kOiAnc2VuZE1lc3NhZ2UnLFxuICBvcHRpb25zOiBkZWZhdWx0cyh7XG4gICAgY2hhdF9pZDogZGVmYXVsdFRvKHBhdGgoWydtZXNzYWdlJywgJ2NoYXQnLCAnaWQnXSwgdXBkYXRlKSksXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZDogZGVmYXVsdFRvKHBhdGgoWydtZXNzYWdlJywgJ21lc3NhZ2VfaWQnXSwgdXBkYXRlKSksXG4gICAgdGV4dDogZGVmYXVsdFRvKCdOdWxsLWNhdGNoOiBubyB0ZXh0IHByb3ZpZGVkJyksXG4gICAgcmVwbHlfbWFya3VwOiBKU09OLnN0cmluZ2lmeVxuICB9LCBpcyhTdHJpbmcsIG9wdGlvbnMpID8ge3RleHQ6IG9wdGlvbnN9IDogb3B0aW9ucylcbn0pKVxuXG5leHBvcnQgbGV0IGFuc3dlcklubGluZVF1ZXJ5ID0gY3VycnlOKDIsIChvcHRpb25zID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgdXBkYXRlUmVzdWx0cyA9IChyZXN1bHRzKSA9PiByZXN1bHRzWzBdLmlkID8gcmVzdWx0cyA6IG1hcChcbiAgICBhbnN3ZXIgPT4gYXNzb2MoJ2lkJywgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIpLCBhbnN3ZXIpLFxuICAgIHJlc3VsdHMgfHwgW10pXG5cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdhbnN3ZXJJbmxpbmVRdWVyeScsXG4gICAgb3B0aW9uczogZGVmYXVsdHMoe1xuICAgICAgaW5saW5lX3F1ZXJ5X2lkOiBkZWZhdWx0VG8ocGF0aChbJ2lubGluZV9xdWVyeScsICdpZCddLCB1cGRhdGUpKSxcbiAgICAgIHJlc3VsdHM6IGNvbXBvc2UoSlNPTi5zdHJpbmdpZnksIHVwZGF0ZVJlc3VsdHMpXG4gICAgfSwgaXNBcnJheUxpa2Uob3B0aW9ucykgPyB7cmVzdWx0czogb3B0aW9uc30gOiBvcHRpb25zKVxuICB9KVxufSlcblxuZXhwb3J0IGxldCBmb3J3YXJkTWVzc2FnZSA9IGN1cnJ5TigyLCAoe1xuICBjaGF0X2lkLFxuICBmcm9tX2NoYXRfaWQsXG4gIGRpc2FibGVfbm90aWZpY2F0aW9uID0gbnVsbCxcbiAgbWVzc2FnZV9pZFxufSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2hhdF9pZCxcbiAgICBmcm9tX2NoYXRfaWQsXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgbWVzc2FnZV9pZFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnZm9yd2FyZE1lc3NhZ2UnLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgc2VuZFBob3RvID0gY3VycnlOKDIsICh7XG4gIGNoYXRfaWQsXG4gIHBob3RvLFxuICBjYXB0aW9uID0gbnVsbCxcbiAgZGlzYWJsZV9ub3RpZmljYXRpb24gPSBudWxsLFxuICByZXBseV90b19tZXNzYWdlX2lkID0gbnVsbCxcbiAgcmVwbHlfbWFya3VwID0gbnVsbFxufSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2hhdF9pZCxcbiAgICBwaG90byxcbiAgICBjYXB0aW9uLFxuICAgIGRpc2FibGVfbm90aWZpY2F0aW9uLFxuICAgIHJlcGx5X3RvX21lc3NhZ2VfaWQsXG4gICAgcmVwbHlfbWFya3VwXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdzZW5kUGhvdG8nLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgc2VuZEF1ZGlvID0gY3VycnlOKDIsICh7XG4gIGNoYXRfaWQsXG4gIGF1ZGlvLFxuICBkdXJhdGlvbiA9IG51bGwsXG4gIHBlcmZvcm1lciA9IG51bGwsXG4gIHRpdGxlID0gbnVsbCxcbiAgZGlzYWJsZV9ub3RpZmljYXRpb24gPSBudWxsLFxuICByZXBseV90b19tZXNzYWdlX2lkID0gbnVsbCxcbiAgcmVwbHlfbWFya3VwID0gbnVsbFxufSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2hhdF9pZCxcbiAgICBhdWRpbyxcbiAgICBkdXJhdGlvbixcbiAgICBwZXJmb3JtZXIsXG4gICAgdGl0bGUsXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZCxcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3NlbmRBdWRpbycsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBzZW5kRG9jdW1lbnQgPSBjdXJyeU4oMiwgKHtcbiAgY2hhdF9pZCxcbiAgZG9jdW1lbnQsXG4gIGNhcHRpb24gPSBudWxsLFxuICBkaXNhYmxlX25vdGlmaWNhdGlvbiA9IG51bGwsXG4gIHJlcGx5X3RvX21lc3NhZ2VfaWQgPSBudWxsLFxuICByZXBseV9tYXJrdXAgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIGRvY3VtZW50LFxuICAgIGNhcHRpb24sXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZCxcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3NlbmREb2N1bWVudCcsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBzZW5kU3RpY2tlciA9IGN1cnJ5TigyLCAoe1xuICBjaGF0X2lkLFxuICBzdGlja2VyLFxuICBkaXNhYmxlX25vdGlmaWNhdGlvbiA9IG51bGwsXG4gIHJlcGx5X3RvX21lc3NhZ2VfaWQgPSBudWxsLFxuICByZXBseV9tYXJrdXAgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIHN0aWNrZXIsXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZCxcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3NlbmRTdGlja2VyJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IHNlbmRWaWRlbyA9IGN1cnJ5TigyLCAoe1xuICBjaGF0X2lkLFxuICB2aWRlbyxcbiAgZHVyYXRpb24gPSBudWxsLFxuICB3aWR0aCA9IG51bGwsXG4gIGhlaWdodCA9IG51bGwsXG4gIGNhcHRpb24gPSBudWxsLFxuICBkaXNhYmxlX25vdGlmaWNhdGlvbiA9IG51bGwsXG4gIHJlcGx5X3RvX21lc3NhZ2VfaWQgPSBudWxsLFxuICByZXBseV9tYXJrdXAgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIHZpZGVvLFxuICAgIGR1cmF0aW9uLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBjYXB0aW9uLFxuICAgIGRpc2FibGVfbm90aWZpY2F0aW9uLFxuICAgIHJlcGx5X3RvX21lc3NhZ2VfaWQsXG4gICAgcmVwbHlfbWFya3VwXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdzZW5kVmlkZW8nLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgc2VuZFZvaWNlID0gY3VycnlOKDIsICh7XG4gIGNoYXRfaWQsXG4gIHZvaWNlLFxuICBkdXJhdGlvbiA9IG51bGwsXG4gIGRpc2FibGVfbm90aWZpY2F0aW9uID0gbnVsbCxcbiAgcmVwbHlfdG9fbWVzc2FnZV9pZCA9IG51bGwsXG4gIHJlcGx5X21hcmt1cCA9IG51bGxcbn0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWQsXG4gICAgdm9pY2UsXG4gICAgZHVyYXRpb24sXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZCxcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3NlbmRWb2ljZScsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBzZW5kTG9jYXRpb24gPSBjdXJyeU4oMiwgKHtcbiAgY2hhdF9pZCxcbiAgbGF0aXR1ZGUsXG4gIGxvbmdpdHVkZSxcbiAgZGlzYWJsZV9ub3RpZmljYXRpb24gPSBudWxsLFxuICByZXBseV90b19tZXNzYWdlX2lkID0gbnVsbCxcbiAgcmVwbHlfbWFya3VwID0gbnVsbFxufSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2hhdF9pZCxcbiAgICBsYXRpdHVkZSxcbiAgICBsb25naXR1ZGUsXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZCxcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3NlbmRMb2NhdGlvbicsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBzZW5kVmVudWUgPSBjdXJyeU4oMiwgKHtcbiAgY2hhdF9pZCxcbiAgbGF0aXR1ZGUsXG4gIGxvbmdpdHVkZSxcbiAgdGl0bGUsXG4gIGFkZHJlc3MsXG4gIGZvdXJzcXVhcmVfaWQgPSBudWxsLFxuICBkaXNhYmxlX25vdGlmaWNhdGlvbiA9IG51bGwsXG4gIHJlcGx5X3RvX21lc3NhZ2VfaWQgPSBudWxsLFxuICByZXBseV9tYXJrdXAgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIGxhdGl0dWRlLFxuICAgIGxvbmdpdHVkZSxcbiAgICB0aXRsZSxcbiAgICBhZGRyZXNzLFxuICAgIGZvdXJzcXVhcmVfaWQsXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZCxcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3NlbmRWZW51ZScsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBzZW5kQ29udGFjdCA9IGN1cnJ5TigyLCAoe1xuICBjaGF0X2lkLFxuICBwaG9uZV9udW1iZXIsXG4gIGZpcnN0X25hbWUsXG4gIGxhc3RfbmFtZSA9IG51bGwsXG4gIGRpc2FibGVfbm90aWZpY2F0aW9uID0gbnVsbCxcbiAgcmVwbHlfdG9fbWVzc2FnZV9pZCA9IG51bGwsXG4gIHJlcGx5X21hcmt1cCA9IG51bGxcbn0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWQsXG4gICAgcGhvbmVfbnVtYmVyLFxuICAgIGZpcnN0X25hbWUsXG4gICAgbGFzdF9uYW1lLFxuICAgIGRpc2FibGVfbm90aWZpY2F0aW9uLFxuICAgIHJlcGx5X3RvX21lc3NhZ2VfaWQsXG4gICAgcmVwbHlfbWFya3VwXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdzZW5kQ29udGFjdCcsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBnZXRVc2VyUHJvZmlsZVBob3RvcyA9IGN1cnJ5TigyLCAoe1xuICB1c2VyX2lkLFxuICBvZmZzZXQgPSBudWxsLFxuICBsaW1pdCA9IG51bGxcbn0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIHVzZXJfaWQsXG4gICAgb2Zmc2V0LFxuICAgIGxpbWl0XG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdnZXRVc2VyUHJvZmlsZVBob3RvcycsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBnZXRGaWxlID0gY3VycnlOKDIsICh7IGZpbGVfaWQgfSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgZmlsZV9pZFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnZ2V0RmlsZScsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBsZWF2ZUNoYXQgPSBjdXJyeU4oMiwgKHsgY2hhdF9pZCB9ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdsZWF2ZUNoYXQnLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgdW5iYW5DaGF0TWVtYmVyID0gY3VycnlOKDIsICh7IGNoYXRfaWQsIHVzZXJfaWQgfSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2hhdF9pZCxcbiAgICB1c2VyX2lkXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICd1bmJhbkNoYXRNZW1iZXInLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgZ2V0Q2hhdCA9IGN1cnJ5TigyLCAoeyBjaGF0X2lkIH0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWRcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ2dldENoYXQnLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgZ2V0Q2hhdEFkbWluaXN0cmF0b3JzID0gY3VycnlOKDIsICh7IGNoYXRfaWQgfSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2hhdF9pZFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnZ2V0Q2hhdEFkbWluaXN0cmF0b3JzJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IGdldENoYXRNZW1iZXJzQ291bnQgPSBjdXJyeU4oMiwgKHsgY2hhdF9pZCB9ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdnZXRDaGF0TWVtYmVyc0NvdW50JyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IGdldENoYXRNZW1iZXIgPSBjdXJyeU4oMiwgKHsgY2hhdF9pZCwgdXNlcl9pZCB9ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIHVzZXJfaWRcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ2dldENoYXRNZW1iZXInLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgYW5zd2VyQ2FsbGJhY2tRdWVyeSA9IGN1cnJ5TigyLCAoe1xuICBjYWxsYmFja19xdWVyeV9pZCxcbiAgdGV4dCA9IG51bGwsXG4gIHNob3dfYWxlcnQgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjYWxsYmFja19xdWVyeV9pZCxcbiAgICB0ZXh0LFxuICAgIHNob3dfYWxlcnRcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ2Fuc3dlckNhbGxiYWNrUXVlcnknLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgZWRpdE1lc3NhZ2VUZXh0ID0gY3VycnlOKDIsICh7XG4gIHRleHQsXG4gIHBhcnNlX21vZGUgPSBudWxsLFxuICBkaXNhYmxlX3dlYl9wYWdlX3ByZXZpZXcgPSBudWxsLFxuICByZXBseV9tYXJrdXAgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICB0ZXh0LFxuICAgIHBhcnNlX21vZGUsXG4gICAgZGlzYWJsZV93ZWJfcGFnZV9wcmV2aWV3LFxuICAgIHJlcGx5X21hcmt1cFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnZWRpdE1lc3NhZ2VUZXh0JyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IGVkaXRNZXNzYWdlQ2FwdGlvbiA9IGN1cnJ5TigyLCAoe1xuICBjYXB0aW9uID0gbnVsbCxcbiAgcmVwbHlfbWFya3VwID0gbnVsbFxufSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2FwdGlvbixcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ2VkaXRNZXNzYWdlQ2FwdGlvbicsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBlZGl0TWVzc2FnZVJlcGx5TWFya3VwID0gY3VycnlOKDIsICh7XG4gIHJlcGx5X21hcmt1cCA9IG51bGxcbn0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIHJlcGx5X21hcmt1cFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnZWRpdE1lc3NhZ2VSZXBseU1hcmt1cCcsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcbiJdfQ==