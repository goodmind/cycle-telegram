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