'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./telegram-driver/index');

Object.keys(_index).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});