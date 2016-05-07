'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.answerInlineQuery = exports.reply = undefined;

var _types = require('./types/types');

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

  var results = void 0;

  if (!options.results[0].id) {
    results = (0, _ramda.map)(function (answer) {
      return (0, _ramda.assoc)('id', Math.random().toString(36).substring(2), answer);
    }, options.results);
  } else {
    results = options.results || [];
  }

  console.log(options, update);

  return (0, _types.Request)({
    type: 'sink',
    method: 'answerInlineQuery',
    options: (0, _ramda.merge)(options, {
      inline_query_id: update.inline_query.id,
      results: JSON.stringify(results)
    })
  });
});