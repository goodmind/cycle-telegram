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

var getQuery = function getQuery(update) {
  return _tcomb2.default.match(update, UpdateMessageCommand, function (u) {
    return u.message.text.substr((0, _telegramDriver.getEntityFirst)('bot_command', u).offset);
  }, _telegramDriver.UpdateMessage, function (u) {
    return update.message.text;
  }, _telegramDriver.UpdateInlineQuery, function (u) {
    return update.inline_query.query;
  });
};

var matchPattern = (0, _ramda.curryN)(2, function (query, _ref) {
  var pattern = _ref.pattern;
  return pattern ? (0, _ramda.match)(pattern, query) : [];
});

var getProps = matchPattern;

var toProps = (0, _ramda.curryN)(2, function (query, plugin) {
  return { plugin: plugin, props: getProps(query, plugin) };
});

var toIsolate = (0, _ramda.curryN)(3, function (update, sources, _ref2) {
  var plugin = _ref2.plugin;
  var props = _ref2.props;
  return (0, _isolate2.default)(plugin.component)((0, _ramda.merge)({ props: props }, sources), update);
});

var isolatePlugin = (0, _ramda.curryN)(4, function (update, sources, query, plugin) {
  return toIsolate(update, sources, toProps(query, plugin));
});

var transform = function transform(plugins, sources, update, pluginNotFound) {
  var query = getQuery(update);
  var components = plugins.filter((0, _ramda.prop)('pattern')).map(isolatePlugin(update, sources, query));

  return (0, _ramda.isEmpty)(components) ? pluginNotFound : components;
};

var makeComponentSelector = (0, _ramda.curryN)(4, function (f, update, plugins, sources) {
  var query = getQuery(update);
  var components = f(query, plugins);
  var lastIsolated = isolatePlugin((0, _ramda.last)(components));
  return transform(components, sources, update, lastIsolated);
});

var toComponents = makeComponentSelector(function (query, plugins) {
  return (0, _ramda.filter)(matchPattern(query), plugins);
});

var toComponent = makeComponentSelector(function (query, plugins) {
  return [(0, _ramda.find)(matchPattern(query), plugins)];
});

function matchWith(plugins, sources) {
  var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? { dupe: true } : arguments[2];

  var _ref3$dupe = _ref3.dupe;
  var dupe = _ref3$dupe === undefined ? true : _ref3$dupe;

  return this.map(function (x) {
    return dupe ? toComponents(x) : toComponent(x);
  }).flatMap(function (f) {
    return f(plugins, sources);
  }).filter((0, _ramda.prop)('bot'));
}