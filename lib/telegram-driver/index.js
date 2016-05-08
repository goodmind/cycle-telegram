'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entityIs = exports.getEntityFirst = exports.answerInlineQuery = exports.reply = exports.makeTelegramDriver = undefined;

var _types = require('../types');

Object.keys(_types).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _telegramDriver = require('./telegram-driver');

var _sinks = require('./sinks');

var _entities = require('./entities');

exports.makeTelegramDriver = _telegramDriver.makeTelegramDriver;
exports.reply = _sinks.reply;
exports.answerInlineQuery = _sinks.answerInlineQuery;
exports.getEntityFirst = _entities.getEntityFirst;
exports.entityIs = _entities.entityIs;