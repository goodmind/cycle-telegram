'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTelegramDriver = makeTelegramDriver;

var _rx = require('rx');

var _sources = require('./sources');

var _apiRequest = require('./api-request');

var _types = require('../types');

function makeEventsSelector(_ref) {
  var message = _ref.message;
  var inlineQuery = _ref.inlineQuery;
  var chosenInlineResult = _ref.chosenInlineResult;
  var callbackQuery = _ref.callbackQuery;

  return function events(eventName) {
    return _rx.Observable.case(function () {
      return eventName;
    }, {
      'message': message.share(),
      'inline_query': inlineQuery.share(),
      'chosen_inline_result': chosenInlineResult.share(),
      'callback_query': callbackQuery.share()
    });
  };
}

var handleWebhook = function handleWebhook(token, request, proxy) {
  return request.mergeAll().filter(_types.WebhookResponse.is).pluck('update').subscribe(function (upd) {
    return proxy.onNext([upd]);
  }, function (err) {
    return console.error('request error: ', err);
  });
};

var handleRequest = function handleRequest(token, request) {
  return request.mergeAll().filter(_types.Request.is).flatMap(function (_ref2) {
    var method = _ref2.method;
    var query = _ref2.options;
    return (0, _apiRequest.makeAPIRequest)({ token: token, method: method, query: query });
  });
};

function makeTelegramDriver(token) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var state = {
    startDate: options.startDate || Date.now(),
    offset: 0,
    updates: []
  };

  var proxyUpdates = (0, _sources.makeUpdates)(state, token);
  var proxyWebHook = new _rx.Subject();

  if (options.webhook) {
    proxyUpdates = (0, _sources.makeWebHook)(state, proxyWebHook);
  }

  var updates = proxyUpdates.doOnError(function (err) {
    console.error('updates error: ', err);
    console.warn('Waiting 30 seconds before retry...');
  }).catch(proxyUpdates.delay(30000)).replay(null, 1);

  var sources = (0, _sources.makeSources)(updates);
  var disposable = updates.connect();

  return function telegramDriver(request) {
    if (options.webhook) {
      handleWebhook(token, request, proxyWebHook);
    }

    var responses = handleRequest(token, request).share();

    responses.subscribeOnError(function (err) {
      return console.error('request error: ', err);
    });

    return {
      token: token,
      updates: updates,
      responses: responses,
      events: makeEventsSelector(sources),
      dispose: function dispose() {
        return disposable.dispose();
      }
    };
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZWxlZ3JhbS1kcml2ZXIvdGVsZWdyYW0tZHJpdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBdUNnQixrQixHQUFBLGtCOztBQXZDaEI7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsU0FBUyxrQkFBVCxPQUtHO0FBQUEsTUFKRCxPQUlDLFFBSkQsT0FJQztBQUFBLE1BSEQsV0FHQyxRQUhELFdBR0M7QUFBQSxNQUZELGtCQUVDLFFBRkQsa0JBRUM7QUFBQSxNQURELGFBQ0MsUUFERCxhQUNDOztBQUNELFNBQU8sU0FBUyxNQUFULENBQWlCLFNBQWpCLEVBQTRCO0FBQ2pDLFdBQU8sZUFBRSxJQUFGLENBQU87QUFBQSxhQUFNLFNBQU47QUFBQSxLQUFQLEVBQXdCO0FBQzdCLGlCQUFXLFFBQVEsS0FBUixFQURrQjtBQUU3QixzQkFBZ0IsWUFBWSxLQUFaLEVBRmE7QUFHN0IsOEJBQXdCLG1CQUFtQixLQUFuQixFQUhLO0FBSTdCLHdCQUFrQixjQUFjLEtBQWQ7QUFKVyxLQUF4QixDQUFQO0FBTUQsR0FQRDtBQVFEOztBQUVELElBQUksZ0JBQWdCLFNBQWhCLGFBQWdCLENBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUIsS0FBakIsRUFBMkI7QUFDN0MsU0FBTyxRQUFRLFFBQVIsR0FDSixNQURJLENBQ0csdUJBQWdCLEVBRG5CLEVBRUosS0FGSSxDQUVFLFFBRkYsRUFHSixTQUhJLENBSUg7QUFBQSxXQUFPLE1BQU0sTUFBTixDQUFhLENBQUMsR0FBRCxDQUFiLENBQVA7QUFBQSxHQUpHLEVBS0g7QUFBQSxXQUFPLFFBQVEsS0FBUixDQUFjLGlCQUFkLEVBQWlDLEdBQWpDLENBQVA7QUFBQSxHQUxHLENBQVA7QUFNRCxDQVBEOztBQVNBLElBQUksZ0JBQWdCLFNBQWhCLGFBQWdCLENBQUMsS0FBRCxFQUFRLE9BQVIsRUFBb0I7QUFDdEMsU0FBTyxRQUFRLFFBQVIsR0FDSixNQURJLENBQ0csZUFBUSxFQURYLEVBRUosT0FGSSxDQUVJO0FBQUEsUUFDUCxNQURPLFNBQ1AsTUFETztBQUFBLFFBRUUsS0FGRixTQUVQLE9BRk87QUFBQSxXQUdILGdDQUFlLEVBQUMsWUFBRCxFQUFRLGNBQVIsRUFBZ0IsWUFBaEIsRUFBZixDQUhHO0FBQUEsR0FGSixDQUFQO0FBTUQsQ0FQRDs7QUFTTyxTQUFTLGtCQUFULENBQTZCLEtBQTdCLEVBQWtEO0FBQUEsTUFBZCxPQUFjLHlEQUFKLEVBQUk7O0FBQ3ZELE1BQUksUUFBUTtBQUNWLGVBQVcsUUFBUSxTQUFSLElBQXFCLEtBQUssR0FBTCxFQUR0QjtBQUVWLFlBQVEsQ0FGRTtBQUdWLGFBQVM7QUFIQyxHQUFaOztBQU1BLE1BQUksZUFBZSwwQkFBWSxLQUFaLEVBQW1CLEtBQW5CLENBQW5CO0FBQ0EsTUFBSSxlQUFlLGlCQUFuQjs7QUFFQSxNQUFJLFFBQVEsT0FBWixFQUFxQjtBQUNuQixtQkFBZSwwQkFBWSxLQUFaLEVBQW1CLFlBQW5CLENBQWY7QUFDRDs7QUFFRCxNQUFJLFVBQVUsYUFDWCxTQURXLENBQ0QsZUFBTztBQUNoQixZQUFRLEtBQVIsQ0FBYyxpQkFBZCxFQUFpQyxHQUFqQztBQUNBLFlBQVEsSUFBUixDQUFhLG9DQUFiO0FBQ0QsR0FKVyxFQUtYLEtBTFcsQ0FLTCxhQUFhLEtBQWIsQ0FBbUIsS0FBbkIsQ0FMSyxFQU1YLE1BTlcsQ0FNSixJQU5JLEVBTUUsQ0FORixDQUFkOztBQVFBLE1BQUksVUFBVSwwQkFBWSxPQUFaLENBQWQ7QUFDQSxNQUFJLGFBQWEsUUFBUSxPQUFSLEVBQWpCOztBQUVBLFNBQU8sU0FBUyxjQUFULENBQXlCLE9BQXpCLEVBQWtDO0FBQ3ZDLFFBQUksUUFBUSxPQUFaLEVBQXFCO0FBQ25CLG9CQUFjLEtBQWQsRUFBcUIsT0FBckIsRUFBOEIsWUFBOUI7QUFDRDs7QUFFRCxRQUFJLFlBQVksY0FBYyxLQUFkLEVBQXFCLE9BQXJCLEVBQ2IsS0FEYSxFQUFoQjs7QUFHQSxjQUFVLGdCQUFWLENBQTJCO0FBQUEsYUFBTyxRQUFRLEtBQVIsQ0FBYyxpQkFBZCxFQUFpQyxHQUFqQyxDQUFQO0FBQUEsS0FBM0I7O0FBRUEsV0FBTztBQUNMLGtCQURLO0FBRUwsc0JBRks7QUFHTCwwQkFISztBQUlMLGNBQVEsbUJBQW1CLE9BQW5CLENBSkg7QUFLTCxlQUFTO0FBQUEsZUFBTSxXQUFXLE9BQVgsRUFBTjtBQUFBO0FBTEosS0FBUDtBQU9ELEdBakJEO0FBa0JEIiwiZmlsZSI6InRlbGVncmFtLWRyaXZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgYXMgJCwgU3ViamVjdCB9IGZyb20gJ3J4J1xuaW1wb3J0IHsgbWFrZVNvdXJjZXMsIG1ha2VVcGRhdGVzLCBtYWtlV2ViSG9vayB9IGZyb20gJy4vc291cmNlcydcbmltcG9ydCB7IG1ha2VBUElSZXF1ZXN0IH0gZnJvbSAnLi9hcGktcmVxdWVzdCdcbmltcG9ydCB7IFJlcXVlc3QsIFdlYmhvb2tSZXNwb25zZSB9IGZyb20gJy4uL3R5cGVzJ1xuXG5mdW5jdGlvbiBtYWtlRXZlbnRzU2VsZWN0b3IgKHtcbiAgbWVzc2FnZSxcbiAgaW5saW5lUXVlcnksXG4gIGNob3NlbklubGluZVJlc3VsdCxcbiAgY2FsbGJhY2tRdWVyeVxufSkge1xuICByZXR1cm4gZnVuY3Rpb24gZXZlbnRzIChldmVudE5hbWUpIHtcbiAgICByZXR1cm4gJC5jYXNlKCgpID0+IGV2ZW50TmFtZSwge1xuICAgICAgJ21lc3NhZ2UnOiBtZXNzYWdlLnNoYXJlKCksXG4gICAgICAnaW5saW5lX3F1ZXJ5JzogaW5saW5lUXVlcnkuc2hhcmUoKSxcbiAgICAgICdjaG9zZW5faW5saW5lX3Jlc3VsdCc6IGNob3NlbklubGluZVJlc3VsdC5zaGFyZSgpLFxuICAgICAgJ2NhbGxiYWNrX3F1ZXJ5JzogY2FsbGJhY2tRdWVyeS5zaGFyZSgpXG4gICAgfSlcbiAgfVxufVxuXG5sZXQgaGFuZGxlV2ViaG9vayA9ICh0b2tlbiwgcmVxdWVzdCwgcHJveHkpID0+IHtcbiAgcmV0dXJuIHJlcXVlc3QubWVyZ2VBbGwoKVxuICAgIC5maWx0ZXIoV2ViaG9va1Jlc3BvbnNlLmlzKVxuICAgIC5wbHVjaygndXBkYXRlJylcbiAgICAuc3Vic2NyaWJlKFxuICAgICAgdXBkID0+IHByb3h5Lm9uTmV4dChbdXBkXSksXG4gICAgICBlcnIgPT4gY29uc29sZS5lcnJvcigncmVxdWVzdCBlcnJvcjogJywgZXJyKSlcbn1cblxubGV0IGhhbmRsZVJlcXVlc3QgPSAodG9rZW4sIHJlcXVlc3QpID0+IHtcbiAgcmV0dXJuIHJlcXVlc3QubWVyZ2VBbGwoKVxuICAgIC5maWx0ZXIoUmVxdWVzdC5pcylcbiAgICAuZmxhdE1hcCgoe1xuICAgICAgbWV0aG9kLFxuICAgICAgb3B0aW9uczogcXVlcnlcbiAgICB9KSA9PiBtYWtlQVBJUmVxdWVzdCh7dG9rZW4sIG1ldGhvZCwgcXVlcnl9KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VUZWxlZ3JhbURyaXZlciAodG9rZW4sIG9wdGlvbnMgPSB7fSkge1xuICBsZXQgc3RhdGUgPSB7XG4gICAgc3RhcnREYXRlOiBvcHRpb25zLnN0YXJ0RGF0ZSB8fCBEYXRlLm5vdygpLFxuICAgIG9mZnNldDogMCxcbiAgICB1cGRhdGVzOiBbXVxuICB9XG5cbiAgbGV0IHByb3h5VXBkYXRlcyA9IG1ha2VVcGRhdGVzKHN0YXRlLCB0b2tlbilcbiAgbGV0IHByb3h5V2ViSG9vayA9IG5ldyBTdWJqZWN0KClcblxuICBpZiAob3B0aW9ucy53ZWJob29rKSB7XG4gICAgcHJveHlVcGRhdGVzID0gbWFrZVdlYkhvb2soc3RhdGUsIHByb3h5V2ViSG9vaylcbiAgfVxuXG4gIGxldCB1cGRhdGVzID0gcHJveHlVcGRhdGVzXG4gICAgLmRvT25FcnJvcihlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcigndXBkYXRlcyBlcnJvcjogJywgZXJyKVxuICAgICAgY29uc29sZS53YXJuKCdXYWl0aW5nIDMwIHNlY29uZHMgYmVmb3JlIHJldHJ5Li4uJylcbiAgICB9KVxuICAgIC5jYXRjaChwcm94eVVwZGF0ZXMuZGVsYXkoMzAwMDApKVxuICAgIC5yZXBsYXkobnVsbCwgMSlcblxuICBsZXQgc291cmNlcyA9IG1ha2VTb3VyY2VzKHVwZGF0ZXMpXG4gIGxldCBkaXNwb3NhYmxlID0gdXBkYXRlcy5jb25uZWN0KClcblxuICByZXR1cm4gZnVuY3Rpb24gdGVsZWdyYW1Ecml2ZXIgKHJlcXVlc3QpIHtcbiAgICBpZiAob3B0aW9ucy53ZWJob29rKSB7XG4gICAgICBoYW5kbGVXZWJob29rKHRva2VuLCByZXF1ZXN0LCBwcm94eVdlYkhvb2spXG4gICAgfVxuXG4gICAgbGV0IHJlc3BvbnNlcyA9IGhhbmRsZVJlcXVlc3QodG9rZW4sIHJlcXVlc3QpXG4gICAgICAuc2hhcmUoKVxuXG4gICAgcmVzcG9uc2VzLnN1YnNjcmliZU9uRXJyb3IoZXJyID0+IGNvbnNvbGUuZXJyb3IoJ3JlcXVlc3QgZXJyb3I6ICcsIGVycikpXG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICB1cGRhdGVzLFxuICAgICAgcmVzcG9uc2VzLFxuICAgICAgZXZlbnRzOiBtYWtlRXZlbnRzU2VsZWN0b3Ioc291cmNlcyksXG4gICAgICBkaXNwb3NlOiAoKSA9PiBkaXNwb3NhYmxlLmRpc3Bvc2UoKVxuICAgIH1cbiAgfVxufVxuIl19