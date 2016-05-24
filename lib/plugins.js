'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchPlugin = undefined;

var _telegramDriver = require('./telegram-driver');

var _ramda = require('ramda');

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchPluginPath = function matchPluginPath(plugins, str) {
  return (0, _ramda.find)(function (_ref) {
    var path = _ref.path;
    return str.match(path);
  }, plugins);
};

var matchPluginArgs = function matchPluginArgs(str, plugin) {
  return str.match(plugin.path);
};

var makeResolverWith = (0, _ramda.curryN)(3, function (plugins, queryWith, u) {
  var query = queryWith(u);
  var plugin = matchPluginPath(plugins, query);
  var props = matchPluginArgs(query, plugin);

  return { plugin: plugin, props: props };
});

var matchPlugin = exports.matchPlugin = function matchPlugin(plugins) {
  var resolve = makeResolverWith(plugins);
  var type = function type(u) {
    return _tcomb2.default.match(u, _telegramDriver.UpdateMessage, resolve(function (u) {
      return u.message.text.substr((0, _telegramDriver.getEntityFirst)('bot_command', u).offset);
    }), _telegramDriver.UpdateInlineQuery, resolve(function (u) {
      return u.inline_query.query;
    }));
  };

  return this.map(function (u) {
    var match = type(u);
    var component = {};
    if (match.plugin.type.is(u)) {
      component = match.plugin.component({ props: match.props }, u) || {};
    }
    return component;
  }).filter((0, _ramda.prop)('bot'));
};