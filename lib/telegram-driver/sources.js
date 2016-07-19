'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.makeUpdates = makeUpdates;
exports.makeWebHook = makeWebHook;
exports.makeSources = makeSources;

var _rx = require('rx');

var _ramda = require('ramda');

var _apiRequest = require('./api-request');

var _types = require('../types');

var max = (0, _ramda.curryN)(3, function (property, acc, current) {
  return current[property] > acc ? current[property] : acc;
});

var makeUpdatesResolver = (0, _ramda.curryN)(2, function (token, offset) {
  return (0, _apiRequest.makeAPIRequest)({
    token: token,
    method: 'getUpdates',
    query: { offset: offset, timeout: 60000 }
  });
});

function makeUpdates(initialState, token) {
  (0, _types.UpdatesState)(initialState);

  var resolve = makeUpdatesResolver(token);

  return _rx.Observable.return(initialState).expand(function (_ref) {
    var offset = _ref.offset;
    return resolve(offset).combineLatest(_rx.Observable.interval(500).take(1), function (updates, _) {
      return (0, _types.UpdatesState)({
        startDate: initialState.startDate,
        offset: (0, _ramda.reduce)(max('update_id'), 0, updates) + 1,
        updates: updates
      });
    });
  });
}

function makeWebHook(initialState, action) {
  (0, _types.UpdatesState)(initialState);

  var webHookUpdates = action.share();

  return _rx.Observable.concat(_rx.Observable.just(initialState), webHookUpdates.map(function (updates) {
    return (0, _types.UpdatesState)({
      startDate: initialState.startDate,
      offset: (0, _ramda.reduce)(max('update_id'), 0, updates) + 1,
      updates: updates
    });
  })).share();
}

function makeSources(state) {
  var updates = state.pluck('updates').map(function (u) {
    return _rx.Observable.fromArray(u);
  }).switch().share();

  var startDate = state.pluck('startDate').share();

  return {
    message: _rx.Observable.zip(updates, startDate).filter(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2);

      var update = _ref3[0];
      var startDate = _ref3[1];
      return _types.Message.is(update.message);
    }).filter(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2);

      var update = _ref5[0];
      var startDate = _ref5[1];
      return startDate - update.message.date * 1000 <= 30000;
    }).map(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 1);

      var update = _ref7[0];
      return update;
    }).share(),

    inlineQuery: updates.filter((0, _ramda.propIs)(_types.InlineQuery, 'inline_query')).share(),

    chosenInlineResult: updates.filter((0, _ramda.propIs)(_types.ChosenInlineResult, 'chosen_inline_result')).share(),

    callbackQuery: updates.filter((0, _ramda.propIs)(_types.CallbackQuery, 'callback_query')).share()
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZWxlZ3JhbS1kcml2ZXIvc291cmNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQXFCZ0IsVyxHQUFBLFc7UUFlQSxXLEdBQUEsVztRQWVBLFcsR0FBQSxXOztBQW5EaEI7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBUUEsSUFBSSxNQUFNLG1CQUFPLENBQVAsRUFDUixVQUFDLFFBQUQsRUFBVyxHQUFYLEVBQWdCLE9BQWhCO0FBQUEsU0FBNEIsUUFBUSxRQUFSLElBQW9CLEdBQXBCLEdBQTBCLFFBQVEsUUFBUixDQUExQixHQUE4QyxHQUExRTtBQUFBLENBRFEsQ0FBVjs7QUFHQSxJQUFJLHNCQUFzQixtQkFBTyxDQUFQLEVBQVUsVUFBQyxLQUFELEVBQVEsTUFBUjtBQUFBLFNBQW1CLGdDQUFlO0FBQ3BFLGdCQURvRTtBQUVwRSxZQUFRLFlBRjREO0FBR3BFLFdBQU8sRUFBRSxjQUFGLEVBQVUsU0FBUyxLQUFuQjtBQUg2RCxHQUFmLENBQW5CO0FBQUEsQ0FBVixDQUExQjs7QUFNTyxTQUFTLFdBQVQsQ0FBc0IsWUFBdEIsRUFBb0MsS0FBcEMsRUFBMkM7QUFDaEQsMkJBQWEsWUFBYjs7QUFFQSxNQUFJLFVBQVUsb0JBQW9CLEtBQXBCLENBQWQ7O0FBRUEsU0FBTyxlQUFFLE1BQUYsQ0FBUyxZQUFULEVBQXVCLE1BQXZCLENBQThCO0FBQUEsUUFBRSxNQUFGLFFBQUUsTUFBRjtBQUFBLFdBQWMsUUFBUSxNQUFSLEVBQ2hELGFBRGdELENBRS9DLGVBQUUsUUFBRixDQUFXLEdBQVgsRUFBZ0IsSUFBaEIsQ0FBcUIsQ0FBckIsQ0FGK0MsRUFHL0MsVUFBQyxPQUFELEVBQVUsQ0FBVjtBQUFBLGFBQWdCLHlCQUFhO0FBQzNCLG1CQUFXLGFBQWEsU0FERztBQUUzQixnQkFBUSxtQkFBTyxJQUFJLFdBQUosQ0FBUCxFQUF5QixDQUF6QixFQUE0QixPQUE1QixJQUF1QyxDQUZwQjtBQUczQjtBQUgyQixPQUFiLENBQWhCO0FBQUEsS0FIK0MsQ0FBZDtBQUFBLEdBQTlCLENBQVA7QUFRRDs7QUFFTSxTQUFTLFdBQVQsQ0FBc0IsWUFBdEIsRUFBb0MsTUFBcEMsRUFBNEM7QUFDakQsMkJBQWEsWUFBYjs7QUFFQSxNQUFJLGlCQUFpQixPQUFPLEtBQVAsRUFBckI7O0FBRUEsU0FBTyxlQUFFLE1BQUYsQ0FDTCxlQUFFLElBQUYsQ0FBTyxZQUFQLENBREssRUFFTCxlQUFlLEdBQWYsQ0FBbUIsVUFBQyxPQUFEO0FBQUEsV0FBYSx5QkFBYTtBQUMzQyxpQkFBVyxhQUFhLFNBRG1CO0FBRTNDLGNBQVEsbUJBQU8sSUFBSSxXQUFKLENBQVAsRUFBeUIsQ0FBekIsRUFBNEIsT0FBNUIsSUFBdUMsQ0FGSjtBQUczQztBQUgyQyxLQUFiLENBQWI7QUFBQSxHQUFuQixDQUZLLEVBT0osS0FQSSxFQUFQO0FBUUQ7O0FBRU0sU0FBUyxXQUFULENBQXNCLEtBQXRCLEVBQTZCO0FBQ2xDLE1BQUksVUFBVSxNQUNYLEtBRFcsQ0FDTCxTQURLLEVBRVgsR0FGVyxDQUVQO0FBQUEsV0FBSyxlQUFFLFNBQUYsQ0FBWSxDQUFaLENBQUw7QUFBQSxHQUZPLEVBR1gsTUFIVyxHQUlYLEtBSlcsRUFBZDs7QUFNQSxNQUFJLFlBQVksTUFDYixLQURhLENBQ1AsV0FETyxFQUViLEtBRmEsRUFBaEI7O0FBSUEsU0FBTztBQUNMLGFBQVMsZUFBRSxHQUFGLENBQU0sT0FBTixFQUFlLFNBQWYsRUFDTixNQURNLENBQ0M7QUFBQTs7QUFBQSxVQUFFLE1BQUY7QUFBQSxVQUFVLFNBQVY7QUFBQSxhQUF5QixlQUFRLEVBQVIsQ0FBVyxPQUFPLE9BQWxCLENBQXpCO0FBQUEsS0FERCxFQUVOLE1BRk0sQ0FFQztBQUFBOztBQUFBLFVBQ04sTUFETTtBQUFBLFVBRU4sU0FGTTtBQUFBLGFBR0QsWUFBWSxPQUFPLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLElBQW5DLElBQTRDLEtBSDFDO0FBQUEsS0FGRCxFQU1OLEdBTk0sQ0FNRjtBQUFBOztBQUFBLFVBQUUsTUFBRjtBQUFBLGFBQWMsTUFBZDtBQUFBLEtBTkUsRUFPTixLQVBNLEVBREo7O0FBVUwsaUJBQWEsUUFDVixNQURVLENBQ0gsdUNBQW9CLGNBQXBCLENBREcsRUFFVixLQUZVLEVBVlI7O0FBY0wsd0JBQW9CLFFBQ2pCLE1BRGlCLENBQ1YsOENBQTJCLHNCQUEzQixDQURVLEVBRWpCLEtBRmlCLEVBZGY7O0FBa0JMLG1CQUFlLFFBQ1osTUFEWSxDQUNMLHlDQUFzQixnQkFBdEIsQ0FESyxFQUVaLEtBRlk7QUFsQlYsR0FBUDtBQXNCRCIsImZpbGUiOiJzb3VyY2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyAkIH0gZnJvbSAncngnXG5cbmltcG9ydCB7IGN1cnJ5TiwgcmVkdWNlLCBwcm9wSXMgfSBmcm9tICdyYW1kYSdcbmltcG9ydCB7IG1ha2VBUElSZXF1ZXN0IH0gZnJvbSAnLi9hcGktcmVxdWVzdCdcbmltcG9ydCB7XG4gIFVwZGF0ZXNTdGF0ZSxcbiAgTWVzc2FnZSxcbiAgSW5saW5lUXVlcnksXG4gIENob3NlbklubGluZVJlc3VsdCxcbiAgQ2FsbGJhY2tRdWVyeVxufSBmcm9tICcuLi90eXBlcydcblxubGV0IG1heCA9IGN1cnJ5TigzLFxuICAocHJvcGVydHksIGFjYywgY3VycmVudCkgPT4gY3VycmVudFtwcm9wZXJ0eV0gPiBhY2MgPyBjdXJyZW50W3Byb3BlcnR5XSA6IGFjYylcblxubGV0IG1ha2VVcGRhdGVzUmVzb2x2ZXIgPSBjdXJyeU4oMiwgKHRva2VuLCBvZmZzZXQpID0+IG1ha2VBUElSZXF1ZXN0KHtcbiAgdG9rZW4sXG4gIG1ldGhvZDogJ2dldFVwZGF0ZXMnLFxuICBxdWVyeTogeyBvZmZzZXQsIHRpbWVvdXQ6IDYwMDAwIH1cbn0pKVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVVwZGF0ZXMgKGluaXRpYWxTdGF0ZSwgdG9rZW4pIHtcbiAgVXBkYXRlc1N0YXRlKGluaXRpYWxTdGF0ZSlcblxuICBsZXQgcmVzb2x2ZSA9IG1ha2VVcGRhdGVzUmVzb2x2ZXIodG9rZW4pXG5cbiAgcmV0dXJuICQucmV0dXJuKGluaXRpYWxTdGF0ZSkuZXhwYW5kKCh7b2Zmc2V0fSkgPT4gcmVzb2x2ZShvZmZzZXQpXG4gICAgLmNvbWJpbmVMYXRlc3QoXG4gICAgICAkLmludGVydmFsKDUwMCkudGFrZSgxKSxcbiAgICAgICh1cGRhdGVzLCBfKSA9PiBVcGRhdGVzU3RhdGUoe1xuICAgICAgICBzdGFydERhdGU6IGluaXRpYWxTdGF0ZS5zdGFydERhdGUsXG4gICAgICAgIG9mZnNldDogcmVkdWNlKG1heCgndXBkYXRlX2lkJyksIDAsIHVwZGF0ZXMpICsgMSxcbiAgICAgICAgdXBkYXRlc1xuICAgICAgfSkpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVdlYkhvb2sgKGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIFVwZGF0ZXNTdGF0ZShpbml0aWFsU3RhdGUpXG5cbiAgbGV0IHdlYkhvb2tVcGRhdGVzID0gYWN0aW9uLnNoYXJlKClcblxuICByZXR1cm4gJC5jb25jYXQoXG4gICAgJC5qdXN0KGluaXRpYWxTdGF0ZSksXG4gICAgd2ViSG9va1VwZGF0ZXMubWFwKCh1cGRhdGVzKSA9PiBVcGRhdGVzU3RhdGUoe1xuICAgICAgc3RhcnREYXRlOiBpbml0aWFsU3RhdGUuc3RhcnREYXRlLFxuICAgICAgb2Zmc2V0OiByZWR1Y2UobWF4KCd1cGRhdGVfaWQnKSwgMCwgdXBkYXRlcykgKyAxLFxuICAgICAgdXBkYXRlc1xuICAgIH0pKSlcbiAgICAuc2hhcmUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVNvdXJjZXMgKHN0YXRlKSB7XG4gIGxldCB1cGRhdGVzID0gc3RhdGVcbiAgICAucGx1Y2soJ3VwZGF0ZXMnKVxuICAgIC5tYXAodSA9PiAkLmZyb21BcnJheSh1KSlcbiAgICAuc3dpdGNoKClcbiAgICAuc2hhcmUoKVxuXG4gIGxldCBzdGFydERhdGUgPSBzdGF0ZVxuICAgIC5wbHVjaygnc3RhcnREYXRlJylcbiAgICAuc2hhcmUoKVxuXG4gIHJldHVybiB7XG4gICAgbWVzc2FnZTogJC56aXAodXBkYXRlcywgc3RhcnREYXRlKVxuICAgICAgLmZpbHRlcigoW3VwZGF0ZSwgc3RhcnREYXRlXSkgPT4gTWVzc2FnZS5pcyh1cGRhdGUubWVzc2FnZSkpXG4gICAgICAuZmlsdGVyKChbXG4gICAgICAgIHVwZGF0ZSxcbiAgICAgICAgc3RhcnREYXRlXG4gICAgICBdKSA9PiAoc3RhcnREYXRlIC0gdXBkYXRlLm1lc3NhZ2UuZGF0ZSAqIDEwMDApIDw9IDMwMDAwKVxuICAgICAgLm1hcCgoW3VwZGF0ZV0pID0+IHVwZGF0ZSlcbiAgICAgIC5zaGFyZSgpLFxuXG4gICAgaW5saW5lUXVlcnk6IHVwZGF0ZXNcbiAgICAgIC5maWx0ZXIocHJvcElzKElubGluZVF1ZXJ5LCAnaW5saW5lX3F1ZXJ5JykpXG4gICAgICAuc2hhcmUoKSxcblxuICAgIGNob3NlbklubGluZVJlc3VsdDogdXBkYXRlc1xuICAgICAgLmZpbHRlcihwcm9wSXMoQ2hvc2VuSW5saW5lUmVzdWx0LCAnY2hvc2VuX2lubGluZV9yZXN1bHQnKSlcbiAgICAgIC5zaGFyZSgpLFxuXG4gICAgY2FsbGJhY2tRdWVyeTogdXBkYXRlc1xuICAgICAgLmZpbHRlcihwcm9wSXMoQ2FsbGJhY2tRdWVyeSwgJ2NhbGxiYWNrX3F1ZXJ5JykpXG4gICAgICAuc2hhcmUoKVxuICB9XG59XG4iXX0=