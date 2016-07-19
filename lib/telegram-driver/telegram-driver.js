'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTelegramDriver = makeTelegramDriver;

var _rxAdapter = require('@cycle/rx-adapter');

var _rxAdapter2 = _interopRequireDefault(_rxAdapter);

var _rx = require('rx');

var _sources = require('./sources');

var _apiRequest = require('./api-request');

var _types = require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeEventsSelector(_ref, adapt) {
  var message = _ref.message;
  var inlineQuery = _ref.inlineQuery;
  var chosenInlineResult = _ref.chosenInlineResult;
  var callbackQuery = _ref.callbackQuery;

  return function events(eventName) {
    var rxStream = _rx.Observable.case(function () {
      return eventName;
    }, {
      'message': message.share(),
      'inline_query': inlineQuery.share(),
      'chosen_inline_result': chosenInlineResult.share(),
      'callback_query': callbackQuery.share()
    });

    return adapt(rxStream);
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

var adapter = function adapter(runSA) {
  return function (stream) {
    return runSA ? runSA.adapt(stream, _rxAdapter2.default.streamSubscribe) : stream;
  };
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

  function telegramDriver(request, runSA) {
    var adapt = adapter(runSA);

    if (options.webhook) {
      handleWebhook(token, request, proxyWebHook);
    }

    var responses = handleRequest(token, request).share();

    responses.subscribeOnError(function (err) {
      return console.error('request error: ', err);
    });

    return {
      token: token,
      updates: adapt(updates),
      responses: adapt(responses),
      events: makeEventsSelector(sources, adapt),
      dispose: function dispose() {
        return disposable.dispose();
      }
    };
  }

  telegramDriver.streamAdapter = _rxAdapter2.default;

  return telegramDriver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZWxlZ3JhbS1kcml2ZXIvdGVsZWdyYW0tZHJpdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBOENnQixrQixHQUFBLGtCOztBQTlDaEI7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLFNBQVMsa0JBQVQsT0FLRyxLQUxILEVBS1U7QUFBQSxNQUpSLE9BSVEsUUFKUixPQUlRO0FBQUEsTUFIUixXQUdRLFFBSFIsV0FHUTtBQUFBLE1BRlIsa0JBRVEsUUFGUixrQkFFUTtBQUFBLE1BRFIsYUFDUSxRQURSLGFBQ1E7O0FBQ1IsU0FBTyxTQUFTLE1BQVQsQ0FBaUIsU0FBakIsRUFBNEI7QUFDakMsUUFBSSxXQUFXLGVBQUUsSUFBRixDQUFPO0FBQUEsYUFBTSxTQUFOO0FBQUEsS0FBUCxFQUF3QjtBQUNyQyxpQkFBVyxRQUFRLEtBQVIsRUFEMEI7QUFFckMsc0JBQWdCLFlBQVksS0FBWixFQUZxQjtBQUdyQyw4QkFBd0IsbUJBQW1CLEtBQW5CLEVBSGE7QUFJckMsd0JBQWtCLGNBQWMsS0FBZDtBQUptQixLQUF4QixDQUFmOztBQU9BLFdBQU8sTUFBTSxRQUFOLENBQVA7QUFDRCxHQVREO0FBVUQ7O0FBRUQsSUFBSSxnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixLQUFqQixFQUEyQjtBQUM3QyxTQUFPLFFBQVEsUUFBUixHQUNKLE1BREksQ0FDRyx1QkFBZ0IsRUFEbkIsRUFFSixLQUZJLENBRUUsUUFGRixFQUdKLFNBSEksQ0FJSDtBQUFBLFdBQU8sTUFBTSxNQUFOLENBQWEsQ0FBQyxHQUFELENBQWIsQ0FBUDtBQUFBLEdBSkcsRUFLSDtBQUFBLFdBQU8sUUFBUSxLQUFSLENBQWMsaUJBQWQsRUFBaUMsR0FBakMsQ0FBUDtBQUFBLEdBTEcsQ0FBUDtBQU1ELENBUEQ7O0FBU0EsSUFBSSxnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUN0QyxTQUFPLFFBQVEsUUFBUixHQUNKLE1BREksQ0FDRyxlQUFRLEVBRFgsRUFFSixPQUZJLENBRUk7QUFBQSxRQUNQLE1BRE8sU0FDUCxNQURPO0FBQUEsUUFFRSxLQUZGLFNBRVAsT0FGTztBQUFBLFdBR0gsZ0NBQWUsRUFBQyxZQUFELEVBQVEsY0FBUixFQUFnQixZQUFoQixFQUFmLENBSEc7QUFBQSxHQUZKLENBQVA7QUFNRCxDQVBEOztBQVNBLElBQUksVUFBVSxTQUFWLE9BQVU7QUFBQSxTQUFTO0FBQUEsV0FBVSxRQUM3QixNQUFNLEtBQU4sQ0FBWSxNQUFaLEVBQW9CLG9CQUFVLGVBQTlCLENBRDZCLEdBQ29CLE1BRDlCO0FBQUEsR0FBVDtBQUFBLENBQWQ7O0FBR08sU0FBUyxrQkFBVCxDQUE2QixLQUE3QixFQUFrRDtBQUFBLE1BQWQsT0FBYyx5REFBSixFQUFJOztBQUN2RCxNQUFJLFFBQVE7QUFDVixlQUFXLFFBQVEsU0FBUixJQUFxQixLQUFLLEdBQUwsRUFEdEI7QUFFVixZQUFRLENBRkU7QUFHVixhQUFTO0FBSEMsR0FBWjs7QUFNQSxNQUFJLGVBQWUsMEJBQVksS0FBWixFQUFtQixLQUFuQixDQUFuQjtBQUNBLE1BQUksZUFBZSxpQkFBbkI7O0FBRUEsTUFBSSxRQUFRLE9BQVosRUFBcUI7QUFDbkIsbUJBQWUsMEJBQVksS0FBWixFQUFtQixZQUFuQixDQUFmO0FBQ0Q7O0FBRUQsTUFBSSxVQUFVLGFBQ1gsU0FEVyxDQUNELGVBQU87QUFDaEIsWUFBUSxLQUFSLENBQWMsaUJBQWQsRUFBaUMsR0FBakM7QUFDQSxZQUFRLElBQVIsQ0FBYSxvQ0FBYjtBQUNELEdBSlcsRUFLWCxLQUxXLENBS0wsYUFBYSxLQUFiLENBQW1CLEtBQW5CLENBTEssRUFNWCxNQU5XLENBTUosSUFOSSxFQU1FLENBTkYsQ0FBZDs7QUFRQSxNQUFJLFVBQVUsMEJBQVksT0FBWixDQUFkO0FBQ0EsTUFBSSxhQUFhLFFBQVEsT0FBUixFQUFqQjs7QUFFQSxXQUFTLGNBQVQsQ0FBeUIsT0FBekIsRUFBa0MsS0FBbEMsRUFBeUM7QUFDdkMsUUFBSSxRQUFRLFFBQVEsS0FBUixDQUFaOztBQUVBLFFBQUksUUFBUSxPQUFaLEVBQXFCO0FBQ25CLG9CQUFjLEtBQWQsRUFBcUIsT0FBckIsRUFBOEIsWUFBOUI7QUFDRDs7QUFFRCxRQUFJLFlBQVksY0FBYyxLQUFkLEVBQXFCLE9BQXJCLEVBQ2IsS0FEYSxFQUFoQjs7QUFHQSxjQUFVLGdCQUFWLENBQTJCO0FBQUEsYUFBTyxRQUFRLEtBQVIsQ0FBYyxpQkFBZCxFQUFpQyxHQUFqQyxDQUFQO0FBQUEsS0FBM0I7O0FBRUEsV0FBTztBQUNMLGtCQURLO0FBRUwsZUFBUyxNQUFNLE9BQU4sQ0FGSjtBQUdMLGlCQUFXLE1BQU0sU0FBTixDQUhOO0FBSUwsY0FBUSxtQkFBbUIsT0FBbkIsRUFBNEIsS0FBNUIsQ0FKSDtBQUtMLGVBQVM7QUFBQSxlQUFNLFdBQVcsT0FBWCxFQUFOO0FBQUE7QUFMSixLQUFQO0FBT0Q7O0FBRUQsaUJBQWUsYUFBZjs7QUFFQSxTQUFPLGNBQVA7QUFDRCIsImZpbGUiOiJ0ZWxlZ3JhbS1kcml2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUnhBZGFwdGVyIGZyb20gJ0BjeWNsZS9yeC1hZGFwdGVyJ1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzICQsIFN1YmplY3QgfSBmcm9tICdyeCdcbmltcG9ydCB7IG1ha2VTb3VyY2VzLCBtYWtlVXBkYXRlcywgbWFrZVdlYkhvb2sgfSBmcm9tICcuL3NvdXJjZXMnXG5pbXBvcnQgeyBtYWtlQVBJUmVxdWVzdCB9IGZyb20gJy4vYXBpLXJlcXVlc3QnXG5pbXBvcnQgeyBSZXF1ZXN0LCBXZWJob29rUmVzcG9uc2UgfSBmcm9tICcuLi90eXBlcydcblxuZnVuY3Rpb24gbWFrZUV2ZW50c1NlbGVjdG9yICh7XG4gIG1lc3NhZ2UsXG4gIGlubGluZVF1ZXJ5LFxuICBjaG9zZW5JbmxpbmVSZXN1bHQsXG4gIGNhbGxiYWNrUXVlcnlcbn0sIGFkYXB0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBldmVudHMgKGV2ZW50TmFtZSkge1xuICAgIGxldCByeFN0cmVhbSA9ICQuY2FzZSgoKSA9PiBldmVudE5hbWUsIHtcbiAgICAgICdtZXNzYWdlJzogbWVzc2FnZS5zaGFyZSgpLFxuICAgICAgJ2lubGluZV9xdWVyeSc6IGlubGluZVF1ZXJ5LnNoYXJlKCksXG4gICAgICAnY2hvc2VuX2lubGluZV9yZXN1bHQnOiBjaG9zZW5JbmxpbmVSZXN1bHQuc2hhcmUoKSxcbiAgICAgICdjYWxsYmFja19xdWVyeSc6IGNhbGxiYWNrUXVlcnkuc2hhcmUoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gYWRhcHQocnhTdHJlYW0pXG4gIH1cbn1cblxubGV0IGhhbmRsZVdlYmhvb2sgPSAodG9rZW4sIHJlcXVlc3QsIHByb3h5KSA9PiB7XG4gIHJldHVybiByZXF1ZXN0Lm1lcmdlQWxsKClcbiAgICAuZmlsdGVyKFdlYmhvb2tSZXNwb25zZS5pcylcbiAgICAucGx1Y2soJ3VwZGF0ZScpXG4gICAgLnN1YnNjcmliZShcbiAgICAgIHVwZCA9PiBwcm94eS5vbk5leHQoW3VwZF0pLFxuICAgICAgZXJyID0+IGNvbnNvbGUuZXJyb3IoJ3JlcXVlc3QgZXJyb3I6ICcsIGVycikpXG59XG5cbmxldCBoYW5kbGVSZXF1ZXN0ID0gKHRva2VuLCByZXF1ZXN0KSA9PiB7XG4gIHJldHVybiByZXF1ZXN0Lm1lcmdlQWxsKClcbiAgICAuZmlsdGVyKFJlcXVlc3QuaXMpXG4gICAgLmZsYXRNYXAoKHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIG9wdGlvbnM6IHF1ZXJ5XG4gICAgfSkgPT4gbWFrZUFQSVJlcXVlc3Qoe3Rva2VuLCBtZXRob2QsIHF1ZXJ5fSkpXG59XG5cbmxldCBhZGFwdGVyID0gcnVuU0EgPT4gc3RyZWFtID0+IHJ1blNBXG4gID8gcnVuU0EuYWRhcHQoc3RyZWFtLCBSeEFkYXB0ZXIuc3RyZWFtU3Vic2NyaWJlKSA6IHN0cmVhbVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVRlbGVncmFtRHJpdmVyICh0b2tlbiwgb3B0aW9ucyA9IHt9KSB7XG4gIGxldCBzdGF0ZSA9IHtcbiAgICBzdGFydERhdGU6IG9wdGlvbnMuc3RhcnREYXRlIHx8IERhdGUubm93KCksXG4gICAgb2Zmc2V0OiAwLFxuICAgIHVwZGF0ZXM6IFtdXG4gIH1cblxuICBsZXQgcHJveHlVcGRhdGVzID0gbWFrZVVwZGF0ZXMoc3RhdGUsIHRva2VuKVxuICBsZXQgcHJveHlXZWJIb29rID0gbmV3IFN1YmplY3QoKVxuXG4gIGlmIChvcHRpb25zLndlYmhvb2spIHtcbiAgICBwcm94eVVwZGF0ZXMgPSBtYWtlV2ViSG9vayhzdGF0ZSwgcHJveHlXZWJIb29rKVxuICB9XG5cbiAgbGV0IHVwZGF0ZXMgPSBwcm94eVVwZGF0ZXNcbiAgICAuZG9PbkVycm9yKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCd1cGRhdGVzIGVycm9yOiAnLCBlcnIpXG4gICAgICBjb25zb2xlLndhcm4oJ1dhaXRpbmcgMzAgc2Vjb25kcyBiZWZvcmUgcmV0cnkuLi4nKVxuICAgIH0pXG4gICAgLmNhdGNoKHByb3h5VXBkYXRlcy5kZWxheSgzMDAwMCkpXG4gICAgLnJlcGxheShudWxsLCAxKVxuXG4gIGxldCBzb3VyY2VzID0gbWFrZVNvdXJjZXModXBkYXRlcylcbiAgbGV0IGRpc3Bvc2FibGUgPSB1cGRhdGVzLmNvbm5lY3QoKVxuXG4gIGZ1bmN0aW9uIHRlbGVncmFtRHJpdmVyIChyZXF1ZXN0LCBydW5TQSkge1xuICAgIGxldCBhZGFwdCA9IGFkYXB0ZXIocnVuU0EpXG5cbiAgICBpZiAob3B0aW9ucy53ZWJob29rKSB7XG4gICAgICBoYW5kbGVXZWJob29rKHRva2VuLCByZXF1ZXN0LCBwcm94eVdlYkhvb2spXG4gICAgfVxuXG4gICAgbGV0IHJlc3BvbnNlcyA9IGhhbmRsZVJlcXVlc3QodG9rZW4sIHJlcXVlc3QpXG4gICAgICAuc2hhcmUoKVxuXG4gICAgcmVzcG9uc2VzLnN1YnNjcmliZU9uRXJyb3IoZXJyID0+IGNvbnNvbGUuZXJyb3IoJ3JlcXVlc3QgZXJyb3I6ICcsIGVycikpXG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICB1cGRhdGVzOiBhZGFwdCh1cGRhdGVzKSxcbiAgICAgIHJlc3BvbnNlczogYWRhcHQocmVzcG9uc2VzKSxcbiAgICAgIGV2ZW50czogbWFrZUV2ZW50c1NlbGVjdG9yKHNvdXJjZXMsIGFkYXB0KSxcbiAgICAgIGRpc3Bvc2U6ICgpID0+IGRpc3Bvc2FibGUuZGlzcG9zZSgpXG4gICAgfVxuICB9XG5cbiAgdGVsZWdyYW1Ecml2ZXIuc3RyZWFtQWRhcHRlciA9IFJ4QWRhcHRlclxuXG4gIHJldHVybiB0ZWxlZ3JhbURyaXZlclxufVxuIl19