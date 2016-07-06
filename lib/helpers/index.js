'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = undefined;

var _entities = require('./entities');

Object.keys(_entities).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _entities[key];
    }
  });
});

var _ramda = require('ramda');

var defaults = exports.defaults = (0, _ramda.curryN)(2, function (transformations, obj) {
  return (0, _ramda.compose)((0, _ramda.evolve)(transformations), _ramda.pickAll)((0, _ramda.chain)(_ramda.keys, [transformations, obj]), obj);
});