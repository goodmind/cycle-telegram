'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entityIs = exports.getEntityFirstValue = exports.getEntityFirst = exports.makeTelegramDriver = undefined;

var _sinks = require('./sinks');

Object.keys(_sinks).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sinks[key];
    }
  });
});

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

var _entities = require('./entities');

exports.makeTelegramDriver = _telegramDriver.makeTelegramDriver;
exports.getEntityFirst = _entities.getEntityFirst;
exports.getEntityFirstValue = _entities.getEntityFirstValue;
exports.entityIs = _entities.entityIs;