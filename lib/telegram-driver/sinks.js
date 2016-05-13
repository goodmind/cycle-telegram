'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webhook = exports.setWebhook = exports.answerInlineQuery = exports.reply = undefined;

var _types = require('../types');

var _ramda = require('ramda');

var reply = exports.reply = (0, _ramda.curryN)(2, function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var update = arguments[1];
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendMessage',
    options: (0, _ramda.merge)(options, {
      chat_id: update.message.chat.id,
      reply_to_message_id: update.message.message_id,
      text: options.text || 'Null-catch: no text provided',
      reply_markup: JSON.stringify(options.reply_markup)
    })
  });
});

var answerInlineQuery = exports.answerInlineQuery = (0, _ramda.curryN)(2, function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var update = arguments[1];

  var results = options.results[0].id ? options.results : (0, _ramda.map)(function (answer) {
    return (0, _ramda.assoc)('id', Math.random().toString(36).substring(2), answer);
  }, options.results || []);

  return (0, _types.Request)({
    type: 'sink',
    method: 'answerInlineQuery',
    options: (0, _ramda.merge)(options, {
      inline_query_id: update.inline_query.id,
      results: JSON.stringify(results)
    })
  });
});

var setWebhook = exports.setWebhook = function setWebhook() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return (0, _types.Request)({
    type: 'sink',
    method: 'setWebhook',
    options: (0, _ramda.merge)(options, {})
  });
};

var webhook = exports.webhook = function webhook(update) {
  return (0, _types.WebhookResponse)({
    type: 'webhook',
    update: update
  });
};