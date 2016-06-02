'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchWith = matchWith;

var _telegramDriver = require('./telegram-driver');

var _ramda = require('ramda');

var _isolate = require('@cycle/isolate');

var _isolate2 = _interopRequireDefault(_isolate);

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpdateMessageCommand = _tcomb2.default.refinement(_telegramDriver.UpdateMessage, (0, _ramda.compose)(_ramda.not, _ramda.isNil, (0, _telegramDriver.getEntityFirst)('bot_command')), 'UpdateMessageCommand');

var UpdateMessageText = _tcomb2.default.refinement(_telegramDriver.UpdateMessage, (0, _ramda.compose)(_ramda.not, _ramda.isNil, function (u) {
  return u.message.text;
}), 'UpdateMessageText');

var getQuery = function getQuery(update) {
  return _tcomb2.default.match(update, UpdateMessageCommand, function (u) {
    return u.message.text.substr((0, _telegramDriver.getEntityFirst)('bot_command', u).offset);
  }, UpdateMessageText, function (u) {
    return update.message.text;
  }, _telegramDriver.UpdateInlineQuery, function (u) {
    return update.inline_query.query;
  }, _tcomb2.default.Any, function () {
    return null;
  });
};

var matchPattern = (0, _ramda.curryN)(2, function (query, _ref) {
  var pattern = _ref.pattern;
  return pattern ? (0, _ramda.match)(pattern, query) : [];
});

var testPattern = (0, _ramda.curryN)(2, function (query, _ref2) {
  var pattern = _ref2.pattern;
  return pattern ? (0, _ramda.test)(pattern, query) : false;
});

var getProps = matchPattern;

var toProps = (0, _ramda.curryN)(2, function (query, plugin) {
  return { plugin: plugin, props: getProps(query, plugin) };
});

var toIsolate = (0, _ramda.curryN)(3, function (update, sources, _ref3) {
  var plugin = _ref3.plugin;
  var props = _ref3.props;
  return (0, _isolate2.default)(plugin.component)((0, _ramda.merge)({ props: props }, sources), update);
});

var isolatePlugin = (0, _ramda.curryN)(4, function (update, sources, query, plugin) {
  return toIsolate(update, sources, toProps(query, plugin));
});

var transform = function transform(plugins, sources, update, pluginNotFound) {
  return (0, _ramda.map)(isolatePlugin(update, sources, getQuery(update)), (0, _ramda.when)(_ramda.isEmpty, function () {
    return [pluginNotFound];
  }, (0, _ramda.filter)((0, _ramda.prop)('pattern'), plugins)));
};

var makeComponentSelector = (0, _ramda.curryN)(4, function (f, update, plugins, sources) {
  return (0, _ramda.when)(_ramda.isNil, [], transform(f(getQuery(update), plugins), sources, update, (0, _ramda.last)(plugins)));
});

var toComponents = makeComponentSelector(function (query, plugins) {
  return (0, _ramda.filter)(testPattern(query), plugins);
});

var toComponent = makeComponentSelector(function (query, plugins) {
  return [(0, _ramda.find)(testPattern(query), plugins)];
});

function matchWith(plugins, sources) {
  var _ref4 = arguments.length <= 2 || arguments[2] === undefined ? { dupe: true } : arguments[2];

  var _ref4$dupe = _ref4.dupe;
  var dupe = _ref4$dupe === undefined ? true : _ref4$dupe;

  return this.map(function (x) {
    return dupe ? toComponents(x) : toComponent(x);
  }).flatMap(function (f) {
    return f(plugins, sources);
  }).filter((0, _ramda.prop)('bot'));
}