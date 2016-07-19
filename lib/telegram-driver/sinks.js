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
    }, (0, _ramda.is)(String, options) ? { text: options } : options)
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
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var update = arguments[1];
  return (0, _types.Request)({
    type: 'sink',
    method: 'editMessageText',
    options: (0, _helpers.defaults)({
      chat_id: (0, _ramda.defaultTo)((0, _ramda.path)(['message', 'chat', 'id'], update)),
      message_id: (0, _ramda.defaultTo)((0, _ramda.path)(['message', 'message_id'], update)),
      text: (0, _ramda.defaultTo)('Null-catch: no text provided'),
      reply_markup: JSON.stringify
    }, options)
  });
});

var editMessageCaption = exports.editMessageCaption = (0, _ramda.curryN)(2, function () {
  var _ref20 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref20$caption = _ref20.caption;
  var caption = _ref20$caption === undefined ? null : _ref20$caption;
  var _ref20$reply_markup = _ref20.reply_markup;
  var reply_markup = _ref20$reply_markup === undefined ? null : _ref20$reply_markup;
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
  var _ref21 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref21$reply_markup = _ref21.reply_markup;
  var reply_markup = _ref21$reply_markup === undefined ? null : _ref21$reply_markup;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZWxlZ3JhbS1kcml2ZXIvc2lua3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQU9BOztBQUVPLElBQUksa0NBQWEsU0FBYixVQUFhO0FBQUEsTUFBQyxPQUFELHlEQUFXLEVBQVg7QUFBQSxTQUFrQixvQkFBUTtBQUNoRCxVQUFNLE1BRDBDO0FBRWhELFlBQVEsWUFGd0M7QUFHaEQ7QUFIZ0QsR0FBUixDQUFsQjtBQUFBLENBQWpCLEM7O0FBTUEsSUFBSSw0QkFBVSxTQUFWLE9BQVUsQ0FBQyxNQUFEO0FBQUEsU0FBWSw0QkFBZ0I7QUFDL0MsVUFBTSxTQUR5QztBQUUvQztBQUYrQyxHQUFoQixDQUFaO0FBQUEsQ0FBZDs7QUFLQSxJQUFJLGdDQUFZLG1CQUFPLENBQVAsRUFBVTtBQUFBLE1BQUMsT0FBRCx5REFBVyxFQUFYO0FBQUEsTUFBZSxNQUFmO0FBQUEsU0FBMEIsb0JBQVE7QUFDakUsVUFBTSxNQUQyRDtBQUVqRSxZQUFRLGFBRnlEO0FBR2pFLGFBQVMsdUJBQVM7QUFDaEIsZUFBUyxzQkFBVSxpQkFBSyxDQUFDLFNBQUQsRUFBWSxNQUFaLEVBQW9CLElBQXBCLENBQUwsRUFBZ0MsTUFBaEMsQ0FBVixDQURPO0FBRWhCLFlBQU0sc0JBQVUsOEJBQVYsQ0FGVTtBQUdoQixvQkFBYyxLQUFLO0FBSEgsS0FBVCxFQUlOLGVBQUcsTUFBSCxFQUFXLE9BQVgsSUFBc0IsRUFBQyxNQUFNLE9BQVAsRUFBdEIsR0FBd0MsT0FKbEM7QUFId0QsR0FBUixDQUExQjtBQUFBLENBQVYsQ0FBaEI7O0FBVUEsSUFBSSx3QkFBUSxtQkFBTyxDQUFQLEVBQVU7QUFBQSxNQUFDLE9BQUQseURBQVcsRUFBWDtBQUFBLE1BQWUsTUFBZjtBQUFBLFNBQTBCLG9CQUFRO0FBQzdELFVBQU0sTUFEdUQ7QUFFN0QsWUFBUSxhQUZxRDtBQUc3RCxhQUFTLHVCQUFTO0FBQ2hCLGVBQVMsc0JBQVUsaUJBQUssQ0FBQyxT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O0FBQUEsbUNBRGpCLFlBQ2lCO0FBQUEsTUFEakIsWUFDaUIsdUNBREYsSUFDRTtBQUFBLE1BQVgsTUFBVzs7QUFDakIsTUFBSSxVQUFVO0FBQ1o7QUFEWSxHQUFkO0FBR0EsU0FBTyxvQkFBUTtBQUNiLFVBQU0sTUFETztBQUViLFlBQVEsd0JBRks7QUFHYjtBQUhhLEdBQVIsQ0FBUDtBQUtELENBWG1DLENBQTdCIiwiZmlsZSI6InNpbmtzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyplc2xpbnQgY2FtZWxjYXNlOiBbXCJvZmZcIl0qL1xuXG5pbXBvcnQgeyBSZXF1ZXN0LCBXZWJob29rUmVzcG9uc2UgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB7XG4gIG1hcCwgYXNzb2MsXG4gIGN1cnJ5TiwgcGF0aCxcbiAgZGVmYXVsdFRvLFxuICBjb21wb3NlLFxuICBpcywgaXNBcnJheUxpa2Vcbn0gZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uL2hlbHBlcnMnXG5cbmV4cG9ydCBsZXQgc2V0V2ViaG9vayA9IChvcHRpb25zID0ge30pID0+IFJlcXVlc3Qoe1xuICB0eXBlOiAnc2luaycsXG4gIG1ldGhvZDogJ3NldFdlYmhvb2snLFxuICBvcHRpb25zXG59KVxuXG5leHBvcnQgbGV0IHdlYmhvb2sgPSAodXBkYXRlKSA9PiBXZWJob29rUmVzcG9uc2Uoe1xuICB0eXBlOiAnd2ViaG9vaycsXG4gIHVwZGF0ZVxufSlcblxuZXhwb3J0IGxldCBicm9hZGNhc3QgPSBjdXJyeU4oMiwgKG9wdGlvbnMgPSB7fSwgdXBkYXRlKSA9PiBSZXF1ZXN0KHtcbiAgdHlwZTogJ3NpbmsnLFxuICBtZXRob2Q6ICdzZW5kTWVzc2FnZScsXG4gIG9wdGlvbnM6IGRlZmF1bHRzKHtcbiAgICBjaGF0X2lkOiBkZWZhdWx0VG8ocGF0aChbJ21lc3NhZ2UnLCAnY2hhdCcsICdpZCddLCB1cGRhdGUpKSxcbiAgICB0ZXh0OiBkZWZhdWx0VG8oJ051bGwtY2F0Y2g6IG5vIHRleHQgcHJvdmlkZWQnKSxcbiAgICByZXBseV9tYXJrdXA6IEpTT04uc3RyaW5naWZ5XG4gIH0sIGlzKFN0cmluZywgb3B0aW9ucykgPyB7dGV4dDogb3B0aW9uc30gOiBvcHRpb25zKVxufSkpXG5cbmV4cG9ydCBsZXQgcmVwbHkgPSBjdXJyeU4oMiwgKG9wdGlvbnMgPSB7fSwgdXBkYXRlKSA9PiBSZXF1ZXN0KHtcbiAgdHlwZTogJ3NpbmsnLFxuICBtZXRob2Q6ICdzZW5kTWVzc2FnZScsXG4gIG9wdGlvbnM6IGRlZmF1bHRzKHtcbiAgICBjaGF0X2lkOiBkZWZhdWx0VG8ocGF0aChbJ21lc3NhZ2UnLCAnY2hhdCcsICdpZCddLCB1cGRhdGUpKSxcbiAgICByZXBseV90b19tZXNzYWdlX2lkOiBkZWZhdWx0VG8ocGF0aChbJ21lc3NhZ2UnLCAnbWVzc2FnZV9pZCddLCB1cGRhdGUpKSxcbiAgICB0ZXh0OiBkZWZhdWx0VG8oJ051bGwtY2F0Y2g6IG5vIHRleHQgcHJvdmlkZWQnKSxcbiAgICByZXBseV9tYXJrdXA6IEpTT04uc3RyaW5naWZ5XG4gIH0sIGlzKFN0cmluZywgb3B0aW9ucykgPyB7dGV4dDogb3B0aW9uc30gOiBvcHRpb25zKVxufSkpXG5cbmV4cG9ydCBsZXQgYW5zd2VySW5saW5lUXVlcnkgPSBjdXJyeU4oMiwgKG9wdGlvbnMgPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCB1cGRhdGVSZXN1bHRzID0gKHJlc3VsdHMpID0+IHJlc3VsdHNbMF0uaWQgPyByZXN1bHRzIDogbWFwKFxuICAgIGFuc3dlciA9PiBhc3NvYygnaWQnLCBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiksIGFuc3dlciksXG4gICAgcmVzdWx0cyB8fCBbXSlcblxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ2Fuc3dlcklubGluZVF1ZXJ5JyxcbiAgICBvcHRpb25zOiBkZWZhdWx0cyh7XG4gICAgICBpbmxpbmVfcXVlcnlfaWQ6IGRlZmF1bHRUbyhwYXRoKFsnaW5saW5lX3F1ZXJ5JywgJ2lkJ10sIHVwZGF0ZSkpLFxuICAgICAgcmVzdWx0czogY29tcG9zZShKU09OLnN0cmluZ2lmeSwgdXBkYXRlUmVzdWx0cylcbiAgICB9LCBpc0FycmF5TGlrZShvcHRpb25zKSA/IHtyZXN1bHRzOiBvcHRpb25zfSA6IG9wdGlvbnMpXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IGZvcndhcmRNZXNzYWdlID0gY3VycnlOKDIsICh7XG4gIGNoYXRfaWQsXG4gIGZyb21fY2hhdF9pZCxcbiAgZGlzYWJsZV9ub3RpZmljYXRpb24gPSBudWxsLFxuICBtZXNzYWdlX2lkXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIGZyb21fY2hhdF9pZCxcbiAgICBkaXNhYmxlX25vdGlmaWNhdGlvbixcbiAgICBtZXNzYWdlX2lkXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdmb3J3YXJkTWVzc2FnZScsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBzZW5kUGhvdG8gPSBjdXJyeU4oMiwgKHtcbiAgY2hhdF9pZCxcbiAgcGhvdG8sXG4gIGNhcHRpb24gPSBudWxsLFxuICBkaXNhYmxlX25vdGlmaWNhdGlvbiA9IG51bGwsXG4gIHJlcGx5X3RvX21lc3NhZ2VfaWQgPSBudWxsLFxuICByZXBseV9tYXJrdXAgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIHBob3RvLFxuICAgIGNhcHRpb24sXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZCxcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3NlbmRQaG90bycsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBzZW5kQXVkaW8gPSBjdXJyeU4oMiwgKHtcbiAgY2hhdF9pZCxcbiAgYXVkaW8sXG4gIGR1cmF0aW9uID0gbnVsbCxcbiAgcGVyZm9ybWVyID0gbnVsbCxcbiAgdGl0bGUgPSBudWxsLFxuICBkaXNhYmxlX25vdGlmaWNhdGlvbiA9IG51bGwsXG4gIHJlcGx5X3RvX21lc3NhZ2VfaWQgPSBudWxsLFxuICByZXBseV9tYXJrdXAgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIGF1ZGlvLFxuICAgIGR1cmF0aW9uLFxuICAgIHBlcmZvcm1lcixcbiAgICB0aXRsZSxcbiAgICBkaXNhYmxlX25vdGlmaWNhdGlvbixcbiAgICByZXBseV90b19tZXNzYWdlX2lkLFxuICAgIHJlcGx5X21hcmt1cFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnc2VuZEF1ZGlvJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IHNlbmREb2N1bWVudCA9IGN1cnJ5TigyLCAoe1xuICBjaGF0X2lkLFxuICBkb2N1bWVudCxcbiAgY2FwdGlvbiA9IG51bGwsXG4gIGRpc2FibGVfbm90aWZpY2F0aW9uID0gbnVsbCxcbiAgcmVwbHlfdG9fbWVzc2FnZV9pZCA9IG51bGwsXG4gIHJlcGx5X21hcmt1cCA9IG51bGxcbn0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWQsXG4gICAgZG9jdW1lbnQsXG4gICAgY2FwdGlvbixcbiAgICBkaXNhYmxlX25vdGlmaWNhdGlvbixcbiAgICByZXBseV90b19tZXNzYWdlX2lkLFxuICAgIHJlcGx5X21hcmt1cFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnc2VuZERvY3VtZW50JyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IHNlbmRTdGlja2VyID0gY3VycnlOKDIsICh7XG4gIGNoYXRfaWQsXG4gIHN0aWNrZXIsXG4gIGRpc2FibGVfbm90aWZpY2F0aW9uID0gbnVsbCxcbiAgcmVwbHlfdG9fbWVzc2FnZV9pZCA9IG51bGwsXG4gIHJlcGx5X21hcmt1cCA9IG51bGxcbn0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWQsXG4gICAgc3RpY2tlcixcbiAgICBkaXNhYmxlX25vdGlmaWNhdGlvbixcbiAgICByZXBseV90b19tZXNzYWdlX2lkLFxuICAgIHJlcGx5X21hcmt1cFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnc2VuZFN0aWNrZXInLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgc2VuZFZpZGVvID0gY3VycnlOKDIsICh7XG4gIGNoYXRfaWQsXG4gIHZpZGVvLFxuICBkdXJhdGlvbiA9IG51bGwsXG4gIHdpZHRoID0gbnVsbCxcbiAgaGVpZ2h0ID0gbnVsbCxcbiAgY2FwdGlvbiA9IG51bGwsXG4gIGRpc2FibGVfbm90aWZpY2F0aW9uID0gbnVsbCxcbiAgcmVwbHlfdG9fbWVzc2FnZV9pZCA9IG51bGwsXG4gIHJlcGx5X21hcmt1cCA9IG51bGxcbn0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWQsXG4gICAgdmlkZW8sXG4gICAgZHVyYXRpb24sXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGNhcHRpb24sXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZCxcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3NlbmRWaWRlbycsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBzZW5kVm9pY2UgPSBjdXJyeU4oMiwgKHtcbiAgY2hhdF9pZCxcbiAgdm9pY2UsXG4gIGR1cmF0aW9uID0gbnVsbCxcbiAgZGlzYWJsZV9ub3RpZmljYXRpb24gPSBudWxsLFxuICByZXBseV90b19tZXNzYWdlX2lkID0gbnVsbCxcbiAgcmVwbHlfbWFya3VwID0gbnVsbFxufSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2hhdF9pZCxcbiAgICB2b2ljZSxcbiAgICBkdXJhdGlvbixcbiAgICBkaXNhYmxlX25vdGlmaWNhdGlvbixcbiAgICByZXBseV90b19tZXNzYWdlX2lkLFxuICAgIHJlcGx5X21hcmt1cFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnc2VuZFZvaWNlJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IHNlbmRMb2NhdGlvbiA9IGN1cnJ5TigyLCAoe1xuICBjaGF0X2lkLFxuICBsYXRpdHVkZSxcbiAgbG9uZ2l0dWRlLFxuICBkaXNhYmxlX25vdGlmaWNhdGlvbiA9IG51bGwsXG4gIHJlcGx5X3RvX21lc3NhZ2VfaWQgPSBudWxsLFxuICByZXBseV9tYXJrdXAgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIGxhdGl0dWRlLFxuICAgIGxvbmdpdHVkZSxcbiAgICBkaXNhYmxlX25vdGlmaWNhdGlvbixcbiAgICByZXBseV90b19tZXNzYWdlX2lkLFxuICAgIHJlcGx5X21hcmt1cFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnc2VuZExvY2F0aW9uJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IHNlbmRWZW51ZSA9IGN1cnJ5TigyLCAoe1xuICBjaGF0X2lkLFxuICBsYXRpdHVkZSxcbiAgbG9uZ2l0dWRlLFxuICB0aXRsZSxcbiAgYWRkcmVzcyxcbiAgZm91cnNxdWFyZV9pZCA9IG51bGwsXG4gIGRpc2FibGVfbm90aWZpY2F0aW9uID0gbnVsbCxcbiAgcmVwbHlfdG9fbWVzc2FnZV9pZCA9IG51bGwsXG4gIHJlcGx5X21hcmt1cCA9IG51bGxcbn0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWQsXG4gICAgbGF0aXR1ZGUsXG4gICAgbG9uZ2l0dWRlLFxuICAgIHRpdGxlLFxuICAgIGFkZHJlc3MsXG4gICAgZm91cnNxdWFyZV9pZCxcbiAgICBkaXNhYmxlX25vdGlmaWNhdGlvbixcbiAgICByZXBseV90b19tZXNzYWdlX2lkLFxuICAgIHJlcGx5X21hcmt1cFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnc2VuZFZlbnVlJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IHNlbmRDb250YWN0ID0gY3VycnlOKDIsICh7XG4gIGNoYXRfaWQsXG4gIHBob25lX251bWJlcixcbiAgZmlyc3RfbmFtZSxcbiAgbGFzdF9uYW1lID0gbnVsbCxcbiAgZGlzYWJsZV9ub3RpZmljYXRpb24gPSBudWxsLFxuICByZXBseV90b19tZXNzYWdlX2lkID0gbnVsbCxcbiAgcmVwbHlfbWFya3VwID0gbnVsbFxufSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2hhdF9pZCxcbiAgICBwaG9uZV9udW1iZXIsXG4gICAgZmlyc3RfbmFtZSxcbiAgICBsYXN0X25hbWUsXG4gICAgZGlzYWJsZV9ub3RpZmljYXRpb24sXG4gICAgcmVwbHlfdG9fbWVzc2FnZV9pZCxcbiAgICByZXBseV9tYXJrdXBcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3NlbmRDb250YWN0JyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IGdldFVzZXJQcm9maWxlUGhvdG9zID0gY3VycnlOKDIsICh7XG4gIHVzZXJfaWQsXG4gIG9mZnNldCA9IG51bGwsXG4gIGxpbWl0ID0gbnVsbFxufSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgdXNlcl9pZCxcbiAgICBvZmZzZXQsXG4gICAgbGltaXRcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ2dldFVzZXJQcm9maWxlUGhvdG9zJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IGdldEZpbGUgPSBjdXJyeU4oMiwgKHsgZmlsZV9pZCB9ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBmaWxlX2lkXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdnZXRGaWxlJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IGxlYXZlQ2hhdCA9IGN1cnJ5TigyLCAoeyBjaGF0X2lkIH0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWRcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ2xlYXZlQ2hhdCcsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCB1bmJhbkNoYXRNZW1iZXIgPSBjdXJyeU4oMiwgKHsgY2hhdF9pZCwgdXNlcl9pZCB9ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkLFxuICAgIHVzZXJfaWRcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ3VuYmFuQ2hhdE1lbWJlcicsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBnZXRDaGF0ID0gY3VycnlOKDIsICh7IGNoYXRfaWQgfSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY2hhdF9pZFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnZ2V0Q2hhdCcsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBnZXRDaGF0QWRtaW5pc3RyYXRvcnMgPSBjdXJyeU4oMiwgKHsgY2hhdF9pZCB9ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjaGF0X2lkXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdnZXRDaGF0QWRtaW5pc3RyYXRvcnMnLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgZ2V0Q2hhdE1lbWJlcnNDb3VudCA9IGN1cnJ5TigyLCAoeyBjaGF0X2lkIH0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWRcbiAgfVxuICByZXR1cm4gUmVxdWVzdCh7XG4gICAgdHlwZTogJ3NpbmsnLFxuICAgIG1ldGhvZDogJ2dldENoYXRNZW1iZXJzQ291bnQnLFxuICAgIG9wdGlvbnNcbiAgfSlcbn0pXG5cbmV4cG9ydCBsZXQgZ2V0Q2hhdE1lbWJlciA9IGN1cnJ5TigyLCAoeyBjaGF0X2lkLCB1c2VyX2lkIH0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNoYXRfaWQsXG4gICAgdXNlcl9pZFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnZ2V0Q2hhdE1lbWJlcicsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBhbnN3ZXJDYWxsYmFja1F1ZXJ5ID0gY3VycnlOKDIsICh7XG4gIGNhbGxiYWNrX3F1ZXJ5X2lkLFxuICB0ZXh0ID0gbnVsbCxcbiAgc2hvd19hbGVydCA9IG51bGxcbn0gPSB7fSwgdXBkYXRlKSA9PiB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNhbGxiYWNrX3F1ZXJ5X2lkLFxuICAgIHRleHQsXG4gICAgc2hvd19hbGVydFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnYW5zd2VyQ2FsbGJhY2tRdWVyeScsXG4gICAgb3B0aW9uc1xuICB9KVxufSlcblxuZXhwb3J0IGxldCBlZGl0TWVzc2FnZVRleHQgPSBjdXJyeU4oMiwgKG9wdGlvbnMgPSB7fSwgdXBkYXRlKSA9PiBSZXF1ZXN0KHtcbiAgdHlwZTogJ3NpbmsnLFxuICBtZXRob2Q6ICdlZGl0TWVzc2FnZVRleHQnLFxuICBvcHRpb25zOiBkZWZhdWx0cyh7XG4gICAgY2hhdF9pZDogZGVmYXVsdFRvKHBhdGgoWydtZXNzYWdlJywgJ2NoYXQnLCAnaWQnXSwgdXBkYXRlKSksXG4gICAgbWVzc2FnZV9pZDogZGVmYXVsdFRvKHBhdGgoWydtZXNzYWdlJywgJ21lc3NhZ2VfaWQnXSwgdXBkYXRlKSksXG4gICAgdGV4dDogZGVmYXVsdFRvKCdOdWxsLWNhdGNoOiBubyB0ZXh0IHByb3ZpZGVkJyksXG4gICAgcmVwbHlfbWFya3VwOiBKU09OLnN0cmluZ2lmeVxuICB9LCBvcHRpb25zKVxufSkpXG5cbmV4cG9ydCBsZXQgZWRpdE1lc3NhZ2VDYXB0aW9uID0gY3VycnlOKDIsICh7XG4gIGNhcHRpb24gPSBudWxsLFxuICByZXBseV9tYXJrdXAgPSBudWxsXG59ID0ge30sIHVwZGF0ZSkgPT4ge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjYXB0aW9uLFxuICAgIHJlcGx5X21hcmt1cFxuICB9XG4gIHJldHVybiBSZXF1ZXN0KHtcbiAgICB0eXBlOiAnc2luaycsXG4gICAgbWV0aG9kOiAnZWRpdE1lc3NhZ2VDYXB0aW9uJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuXG5leHBvcnQgbGV0IGVkaXRNZXNzYWdlUmVwbHlNYXJrdXAgPSBjdXJyeU4oMiwgKHtcbiAgcmVwbHlfbWFya3VwID0gbnVsbFxufSA9IHt9LCB1cGRhdGUpID0+IHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgcmVwbHlfbWFya3VwXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Qoe1xuICAgIHR5cGU6ICdzaW5rJyxcbiAgICBtZXRob2Q6ICdlZGl0TWVzc2FnZVJlcGx5TWFya3VwJyxcbiAgICBvcHRpb25zXG4gIH0pXG59KVxuIl19