'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntityFirstValue = exports.getEntityFirst = exports.entityIs = undefined;

var _ramda = require('ramda');

var entityIs = exports.entityIs = (0, _ramda.useWith)(_ramda.any, [(0, _ramda.propEq)('type'), (0, _ramda.pipe)((0, _ramda.path)(['message', 'entities']), (0, _ramda.defaultTo)([]))]);

var getEntityFirst = exports.getEntityFirst = (0, _ramda.useWith)(_ramda.find, [(0, _ramda.propEq)('type'), (0, _ramda.pipe)((0, _ramda.path)(['message', 'entities']), (0, _ramda.defaultTo)([]))]);

var getEntityFirstValue = exports.getEntityFirstValue = (0, _ramda.curryN)(2, function (type, update) {
  var match = getEntityFirst(type, update);
  return update.message.text.substr(match.offset, match.length);
});