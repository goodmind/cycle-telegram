'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchPlugin = undefined;

var _telegramDriver = require('./telegram-driver');

var _ramda = require('ramda');

var _isolate = require('@cycle/isolate');

var _isolate2 = _interopRequireDefault(_isolate);

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpdateMessageCommand = _tcomb2.default.refinement(_telegramDriver.UpdateMessage, (0, _ramda.compose)(_ramda.not, _ramda.isNil, (0, _telegramDriver.getEntityFirst)('bot_command')), 'UpdateMessageCommand');

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

var matchPlugin = exports.matchPlugin = function matchPlugin(plugins, sources) {
  var resolve = makeResolverWith(plugins);
  var type = function type(u) {
    return _tcomb2.default.match(u, UpdateMessageCommand, resolve(function (u) {
      return u.message.text.substr((0, _telegramDriver.getEntityFirst)('bot_command', u).offset);
    }), _telegramDriver.UpdateInlineQuery, resolve(function (u) {
      return u.inline_query.query;
    }), _telegramDriver.UpdateMessage, resolve(function (u) {
      return u.message.text;
    }));
  };

  return this.map(function (u) {
    var match = type(u);
    var component = {};
    var args = (0, _ramda.merge)({ props: match.props }, sources);
    if (match.plugin.type.is(u)) {
      component = (0, _isolate2.default)(match.plugin.component)(args, u) || {};
    }
    return component;
  }).filter((0, _ramda.prop)('bot'));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbHVnaW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFLQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLHVCQUF1QixnQkFBRSxVQUFGLGdDQUMzQiw4Q0FBb0Isb0NBQWUsYUFBZixDQUFwQixDQUQyQixFQUUzQixzQkFGMkIsQ0FBN0I7O0FBSUEsSUFBSSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBQyxPQUFELEVBQVUsR0FBVjtBQUFBLFNBQWtCLGlCQUN0QztBQUFBLFFBQUUsSUFBRixRQUFFLElBQUY7QUFBQSxXQUFZLElBQUksS0FBSixDQUFVLElBQVYsQ0FBWjtBQUFBLEdBRHNDLEVBRXRDLE9BRnNDLENBQWxCO0FBQUEsQ0FBdEI7O0FBS0EsSUFBSSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBQyxHQUFELEVBQU0sTUFBTjtBQUFBLFNBQWlCLElBQUksS0FBSixDQUFVLE9BQU8sSUFBakIsQ0FBakI7QUFBQSxDQUF0Qjs7QUFFQSxJQUFJLG1CQUFtQixtQkFBTyxDQUFQLEVBQVUsVUFBQyxPQUFELEVBQVUsU0FBVixFQUFxQixDQUFyQixFQUEyQjtBQUMxRCxNQUFJLFFBQVEsVUFBVSxDQUFWLENBQVo7QUFDQSxNQUFJLFNBQVMsZ0JBQWdCLE9BQWhCLEVBQXlCLEtBQXpCLENBQWI7QUFDQSxNQUFJLFFBQVEsZ0JBQWdCLEtBQWhCLEVBQXVCLE1BQXZCLENBQVo7O0FBRUEsU0FBTyxFQUFFLGNBQUYsRUFBVSxZQUFWLEVBQVA7QUFDRCxDQU5zQixDQUF2Qjs7QUFRTyxJQUFJLG9DQUFjLFNBQWQsV0FBYyxDQUFVLE9BQVYsRUFBbUIsT0FBbkIsRUFBNEI7QUFDbkQsTUFBSSxVQUFVLGlCQUFpQixPQUFqQixDQUFkO0FBQ0EsTUFBSSxPQUFPLFNBQVAsSUFBTyxDQUFDLENBQUQ7QUFBQSxXQUFPLGdCQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQ2hCLG9CQURnQixFQUNNLFFBQ3BCO0FBQUEsYUFBSyxFQUFFLE9BQUYsQ0FBVSxJQUFWLENBQWUsTUFBZixDQUFzQixvQ0FBZSxhQUFmLEVBQThCLENBQTlCLEVBQWlDLE1BQXZELENBQUw7QUFBQSxLQURvQixDQUROLHFDQUlHLFFBQ2pCO0FBQUEsYUFBSyxFQUFFLFlBQUYsQ0FBZSxLQUFwQjtBQUFBLEtBRGlCLENBSkgsaUNBT0QsUUFBUTtBQUFBLGFBQUssRUFBRSxPQUFGLENBQVUsSUFBZjtBQUFBLEtBQVIsQ0FQQyxDQUFQO0FBQUEsR0FBWDs7QUFVQSxTQUFPLEtBQUssR0FBTCxDQUFTLGFBQUs7QUFDbkIsUUFBSSxRQUFRLEtBQUssQ0FBTCxDQUFaO0FBQ0EsUUFBSSxZQUFZLEVBQWhCO0FBQ0EsUUFBSSxPQUFPLGtCQUFNLEVBQUMsT0FBTyxNQUFNLEtBQWQsRUFBTixFQUE0QixPQUE1QixDQUFYO0FBQ0EsUUFBSSxNQUFNLE1BQU4sQ0FBYSxJQUFiLENBQWtCLEVBQWxCLENBQXFCLENBQXJCLENBQUosRUFBNkI7QUFDM0Isa0JBQVksdUJBQVEsTUFBTSxNQUFOLENBQWEsU0FBckIsRUFBZ0MsSUFBaEMsRUFBc0MsQ0FBdEMsS0FBNEMsRUFBeEQ7QUFDRDtBQUNELFdBQU8sU0FBUDtBQUNELEdBUk0sRUFRSixNQVJJLENBUUcsaUJBQUssS0FBTCxDQVJILENBQVA7QUFTRCxDQXJCTSIsImZpbGUiOiJwbHVnaW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVXBkYXRlTWVzc2FnZSxcbiAgVXBkYXRlSW5saW5lUXVlcnksXG4gIGdldEVudGl0eUZpcnN0XG59IGZyb20gJy4vdGVsZWdyYW0tZHJpdmVyJ1xuaW1wb3J0IHsgZmluZCwgY3VycnlOLCBwcm9wLCBjb21wb3NlLCBpc05pbCwgbm90LCBtZXJnZSB9IGZyb20gJ3JhbWRhJ1xuXG5pbXBvcnQgaXNvbGF0ZSBmcm9tICdAY3ljbGUvaXNvbGF0ZSdcbmltcG9ydCB0IGZyb20gJ3Rjb21iJ1xuXG5jb25zdCBVcGRhdGVNZXNzYWdlQ29tbWFuZCA9IHQucmVmaW5lbWVudChVcGRhdGVNZXNzYWdlLFxuICBjb21wb3NlKG5vdCwgaXNOaWwsIGdldEVudGl0eUZpcnN0KCdib3RfY29tbWFuZCcpKSxcbiAgJ1VwZGF0ZU1lc3NhZ2VDb21tYW5kJylcblxubGV0IG1hdGNoUGx1Z2luUGF0aCA9IChwbHVnaW5zLCBzdHIpID0+IGZpbmQoXG4gICh7cGF0aH0pID0+IHN0ci5tYXRjaChwYXRoKSxcbiAgcGx1Z2luc1xuKVxuXG5sZXQgbWF0Y2hQbHVnaW5BcmdzID0gKHN0ciwgcGx1Z2luKSA9PiBzdHIubWF0Y2gocGx1Z2luLnBhdGgpXG5cbmxldCBtYWtlUmVzb2x2ZXJXaXRoID0gY3VycnlOKDMsIChwbHVnaW5zLCBxdWVyeVdpdGgsIHUpID0+IHtcbiAgbGV0IHF1ZXJ5ID0gcXVlcnlXaXRoKHUpXG4gIGxldCBwbHVnaW4gPSBtYXRjaFBsdWdpblBhdGgocGx1Z2lucywgcXVlcnkpXG4gIGxldCBwcm9wcyA9IG1hdGNoUGx1Z2luQXJncyhxdWVyeSwgcGx1Z2luKVxuXG4gIHJldHVybiB7IHBsdWdpbiwgcHJvcHMgfVxufSlcblxuZXhwb3J0IGxldCBtYXRjaFBsdWdpbiA9IGZ1bmN0aW9uIChwbHVnaW5zLCBzb3VyY2VzKSB7XG4gIGxldCByZXNvbHZlID0gbWFrZVJlc29sdmVyV2l0aChwbHVnaW5zKVxuICBsZXQgdHlwZSA9ICh1KSA9PiB0Lm1hdGNoKHUsXG4gICAgVXBkYXRlTWVzc2FnZUNvbW1hbmQsIHJlc29sdmUoXG4gICAgICB1ID0+IHUubWVzc2FnZS50ZXh0LnN1YnN0cihnZXRFbnRpdHlGaXJzdCgnYm90X2NvbW1hbmQnLCB1KS5vZmZzZXQpXG4gICAgKSxcbiAgICBVcGRhdGVJbmxpbmVRdWVyeSwgcmVzb2x2ZShcbiAgICAgIHUgPT4gdS5pbmxpbmVfcXVlcnkucXVlcnlcbiAgICApLFxuICAgIFVwZGF0ZU1lc3NhZ2UsIHJlc29sdmUodSA9PiB1Lm1lc3NhZ2UudGV4dClcbiAgKVxuXG4gIHJldHVybiB0aGlzLm1hcCh1ID0+IHtcbiAgICBsZXQgbWF0Y2ggPSB0eXBlKHUpXG4gICAgbGV0IGNvbXBvbmVudCA9IHt9XG4gICAgbGV0IGFyZ3MgPSBtZXJnZSh7cHJvcHM6IG1hdGNoLnByb3BzfSwgc291cmNlcylcbiAgICBpZiAobWF0Y2gucGx1Z2luLnR5cGUuaXModSkpIHtcbiAgICAgIGNvbXBvbmVudCA9IGlzb2xhdGUobWF0Y2gucGx1Z2luLmNvbXBvbmVudCkoYXJncywgdSkgfHwge31cbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudFxuICB9KS5maWx0ZXIocHJvcCgnYm90JykpXG59XG4iXX0=