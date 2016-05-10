'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _telegramDriver = require('./telegram-driver');

Object.keys(_telegramDriver).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _telegramDriver[key];
    }
  });
});