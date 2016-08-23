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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFGQTs7QUFJTyxJQUFJLDhCQUFXLG1CQUFPLENBQVAsRUFBVSxVQUFDLGVBQUQsRUFBa0IsR0FBbEI7QUFBQSxTQUEwQixvQkFDeEQsbUJBQU8sZUFBUCxDQUR3RCxrQkFHdEQsK0JBQVksQ0FBQyxlQUFELEVBQWtCLEdBQWxCLENBQVosQ0FIc0QsRUFJdEQsR0FKc0QsQ0FBMUI7QUFBQSxDQUFWLENBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjdXJyeU4sIGNvbXBvc2UsIGV2b2x2ZSwgcGlja0FsbCwgY2hhaW4sIGtleXMgfSBmcm9tICdyYW1kYSdcblxuZXhwb3J0ICogZnJvbSAnLi9lbnRpdGllcydcblxuZXhwb3J0IGxldCBkZWZhdWx0cyA9IGN1cnJ5TigyLCAodHJhbnNmb3JtYXRpb25zLCBvYmopID0+IGNvbXBvc2UoXG4gIGV2b2x2ZSh0cmFuc2Zvcm1hdGlvbnMpLFxuICBwaWNrQWxsKShcbiAgICBjaGFpbihrZXlzLCBbdHJhbnNmb3JtYXRpb25zLCBvYmpdKSxcbiAgICBvYmopKVxuIl19