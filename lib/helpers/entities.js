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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2VudGl0aWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFNTyxJQUFJLDhCQUFXLGdDQUNmLENBQ0gsbUJBQU8sTUFBUCxDQURHLEVBRUgsaUJBQ0UsaUJBQUssQ0FBQyxTQUFELEVBQVksVUFBWixDQUFMLENBREYsRUFFRSxzQkFBVSxFQUFWLENBRkYsQ0FGRyxDQURlLENBQWY7O0FBUUEsSUFBSSwwQ0FBaUIsaUNBQ3BCLENBQ0osbUJBQU8sTUFBUCxDQURJLEVBRUosaUJBQ0UsaUJBQUssQ0FBQyxTQUFELEVBQVksVUFBWixDQUFMLENBREYsRUFFRSxzQkFBVSxFQUFWLENBRkYsQ0FGSSxDQURvQixDQUFyQjs7QUFRQSxJQUFJLG9EQUFzQixtQkFBTyxDQUFQLEVBQVUsVUFBQyxJQUFELEVBQU8sTUFBUCxFQUFrQjtBQUMzRCxNQUFJLFFBQVEsZUFBZSxJQUFmLEVBQXFCLE1BQXJCLENBQVo7QUFDQSxTQUFPLE9BQU8sT0FBUCxDQUFlLElBQWYsQ0FBb0IsTUFBcEIsQ0FBMkIsTUFBTSxNQUFqQyxFQUF5QyxNQUFNLE1BQS9DLENBQVA7QUFDRCxDQUhnQyxDQUExQiIsImZpbGUiOiJlbnRpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGN1cnJ5TiwgcGlwZSwgcGF0aCxcbiAgdXNlV2l0aCwgYW55LCBwcm9wRXEsXG4gIGRlZmF1bHRUbywgZmluZFxufSBmcm9tICdyYW1kYSdcblxuZXhwb3J0IGxldCBlbnRpdHlJcyA9IHVzZVdpdGgoXG4gIGFueSwgW1xuICAgIHByb3BFcSgndHlwZScpLFxuICAgIHBpcGUoXG4gICAgICBwYXRoKFsnbWVzc2FnZScsICdlbnRpdGllcyddKSxcbiAgICAgIGRlZmF1bHRUbyhbXSkpXG4gIF0pXG5cbmV4cG9ydCBsZXQgZ2V0RW50aXR5Rmlyc3QgPSB1c2VXaXRoKFxuICBmaW5kLCBbXG4gICAgcHJvcEVxKCd0eXBlJyksXG4gICAgcGlwZShcbiAgICAgIHBhdGgoWydtZXNzYWdlJywgJ2VudGl0aWVzJ10pLFxuICAgICAgZGVmYXVsdFRvKFtdKSlcbiAgXSlcblxuZXhwb3J0IGxldCBnZXRFbnRpdHlGaXJzdFZhbHVlID0gY3VycnlOKDIsICh0eXBlLCB1cGRhdGUpID0+IHtcbiAgbGV0IG1hdGNoID0gZ2V0RW50aXR5Rmlyc3QodHlwZSwgdXBkYXRlKVxuICByZXR1cm4gdXBkYXRlLm1lc3NhZ2UudGV4dC5zdWJzdHIobWF0Y2gub2Zmc2V0LCBtYXRjaC5sZW5ndGgpXG59KVxuIl19