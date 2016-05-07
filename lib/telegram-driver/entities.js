'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntityFirst = exports.entityIs = undefined;

var _ramda = require('ramda');

var entityIs = exports.entityIs = function entityIs(type) {
  return (0, _ramda.pipe)((0, _ramda.view)((0, _ramda.lensPath)(['message', 'entities'])), (0, _ramda.ifElse)(_ramda.isArrayLike, (0, _ramda.any)((0, _ramda.propEq)('type', type)), (0, _ramda.pipe)(_ramda.not, _ramda.isNil)));
};

var getEntityFirst = exports.getEntityFirst = (0, _ramda.curry)(function (type, _ref) {
  var message = _ref.message;

  var match = (0, _ramda.find)((0, _ramda.propEq)('type', type))(message.entities);
  return message.text.substr(match.offset, match.length);
});