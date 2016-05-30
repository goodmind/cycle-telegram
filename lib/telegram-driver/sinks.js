'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webhook = exports.setWebhook = exports.answerInlineQuery = exports.reply = exports.broadcast = undefined;

var _types = require('../types');

var _ramda = require('ramda');

var defaults = (0, _ramda.curryN)(2, function (transformations, obj) {
  return (0, _ramda.compose)((0, _ramda.evolve)(transformations), _ramda.pickAll)((0, _ramda.chain)(_ramda.keys, [transformations, obj]), obj);
});

var broadcast = exports.broadcast = (0, _ramda.curryN)(2, function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var update = arguments[1];
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendMessage',
    options: defaults({
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
    options: defaults({
      chat_id: (0, _ramda.defaultTo)((0, _ramda.path)(['message', 'chat', 'id'], update)),
      reply_to_message_id: (0, _ramda.defaultTo)((0, _ramda.path)(['message', 'message_id'], update)),
      text: (0, _ramda.defaultTo)('Null-catch: no text provided'),
      reply_markup: JSON.stringify
    }, options)
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
    options: defaults({
      inline_query_id: (0, _ramda.defaultTo)((0, _ramda.path)(['inline_query', 'id'], update)),
      results: (0, _ramda.compose)(JSON.stringify, updateResults)
    }, options)
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