'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findCommandIn = exports.commandName = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _index = require('./telegram-driver/index');

var commandName = exports.commandName = function commandName(update) {
  return (0, _index.getEntityFirstValue)('bot_command')(update);
};

var findCommandIn = exports.findCommandIn = (0, _ramda.curryN)(2, function (commands, path) {
  var match = (0, _ramda.find)(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var r = _ref2[0];
    var _ = _ref2[1];
    return path.match(r);
  }, commands) || (0, _ramda.takeLast)(1, commands)[0];

  return [match[0], match[1]];
});