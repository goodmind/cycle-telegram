'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webhook = exports.setWebhook = exports.answerInlineQuery = exports.reply = exports.broadcast = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _types = require('../types');

var _ramda = require('ramda');

var _curry = require('ramda/src/internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var evolve = (0, _curry3.default)(function evolve(transformations, object) {
  object = (0, _ramda.pickAll)((0, _ramda.uniq)((0, _ramda.concat)((0, _ramda.keys)(transformations), (0, _ramda.keys)(object))), object);
  console.log(transformations, object);
  var result = {};
  var transformation, key, type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation === 'undefined' ? 'undefined' : _typeof(transformation);
    result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
  }
  return result;
});

var broadcast = exports.broadcast = (0, _ramda.curryN)(2, function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var update = arguments[1];
  return (0, _types.Request)({
    type: 'sink',
    method: 'sendMessage',
    options: evolve({
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
    options: evolve({
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

  var results = options.results[0].id ? options.results : (0, _ramda.map)(function (answer) {
    return (0, _ramda.assoc)('id', Math.random().toString(36).substring(2), answer);
  }, options.results || []);

  return (0, _types.Request)({
    type: 'sink',
    method: 'answerInlineQuery',
    options: evolve({
      inline_query_id: (0, _ramda.defaultTo)((0, _ramda.path)(['inline_query', 'id'], update)),
      results: JSON.stringify
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