'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAPIRequest = makeAPIRequest;

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fromSuperagent = function fromSuperagent(request) {
  return _rx2.default.Observable.create(function (obs) {
    request.end(function (err, res) {
      if (err) {
        obs.onError(err);
      } else {
        obs.onNext(res);
      }
      obs.onCompleted();
    });

    return function () {
      return request.abort();
    };
  });
};

function makeAPIRequest(_ref) {
  var token = _ref.token;
  var method = _ref.method;
  var query = _ref.query;
  var _ref$httpMethod = _ref.httpMethod;
  var httpMethod = _ref$httpMethod === undefined ? 'POST' : _ref$httpMethod;

  var endpoint = 'https://api.telegram.org/bot' + token;
  var url = endpoint + '/' + method;
  var req = (0, _superagent2.default)(httpMethod, url).redirects(0).send(query);

  return fromSuperagent(req).catch(function (e) {
    return _rx2.default.Observable.throw(e instanceof Error ? e : new Error(e));
  }).map(function (res) {
    return res.body;
  }).map(function (body) {
    return body.ok ? _rx2.default.Observable.just(body.result) : _rx2.default.Observable.throw(new Error(body));
  }).switch();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZWxlZ3JhbS1kcml2ZXIvYXBpLXJlcXVlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFnQmdCLGMsR0FBQSxjOztBQWhCaEI7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxpQkFBaUIsU0FBakIsY0FBaUI7QUFBQSxTQUFXLGFBQUcsVUFBSCxDQUFjLE1BQWQsQ0FBcUIsZUFBTztBQUMxRCxZQUFRLEdBQVIsQ0FBWSxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDeEIsVUFBSSxHQUFKLEVBQVM7QUFDUCxZQUFJLE9BQUosQ0FBWSxHQUFaO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSSxNQUFKLENBQVcsR0FBWDtBQUNEO0FBQ0QsVUFBSSxXQUFKO0FBQ0QsS0FQRDs7QUFTQSxXQUFPO0FBQUEsYUFBTSxRQUFRLEtBQVIsRUFBTjtBQUFBLEtBQVA7QUFDRCxHQVgrQixDQUFYO0FBQUEsQ0FBckI7O0FBYU8sU0FBUyxjQUFULE9BS0o7QUFBQSxNQUpELEtBSUMsUUFKRCxLQUlDO0FBQUEsTUFIRCxNQUdDLFFBSEQsTUFHQztBQUFBLE1BRkQsS0FFQyxRQUZELEtBRUM7QUFBQSw2QkFERCxVQUNDO0FBQUEsTUFERCxVQUNDLG1DQURZLE1BQ1o7O0FBQ0QsTUFBSSw0Q0FBMEMsS0FBOUM7QUFDQSxNQUFJLE1BQVMsUUFBVCxTQUFxQixNQUF6QjtBQUNBLE1BQUksTUFBTSwwQkFBUSxVQUFSLEVBQW9CLEdBQXBCLEVBQ1AsU0FETyxDQUNHLENBREgsRUFFUCxJQUZPLENBRUYsS0FGRSxDQUFWOztBQUlBLFNBQU8sZUFBZSxHQUFmLEVBQ0osS0FESSxDQUNFO0FBQUEsV0FBSyxhQUFHLFVBQUgsQ0FBYyxLQUFkLENBQW9CLGFBQWEsS0FBYixHQUFxQixDQUFyQixHQUF5QixJQUFJLEtBQUosQ0FBVSxDQUFWLENBQTdDLENBQUw7QUFBQSxHQURGLEVBRUosR0FGSSxDQUVBO0FBQUEsV0FBTyxJQUFJLElBQVg7QUFBQSxHQUZBLEVBR0osR0FISSxDQUlIO0FBQUEsV0FBUSxLQUFLLEVBQUwsR0FBVSxhQUFHLFVBQUgsQ0FBYyxJQUFkLENBQW1CLEtBQUssTUFBeEIsQ0FBVixHQUNKLGFBQUcsVUFBSCxDQUFjLEtBQWQsQ0FBb0IsSUFBSSxLQUFKLENBQVUsSUFBVixDQUFwQixDQURKO0FBQUEsR0FKRyxFQU1KLE1BTkksRUFBUDtBQU9EIiwiZmlsZSI6ImFwaS1yZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJ4IGZyb20gJ3J4J1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnc3VwZXJhZ2VudCdcblxubGV0IGZyb21TdXBlcmFnZW50ID0gcmVxdWVzdCA9PiBSeC5PYnNlcnZhYmxlLmNyZWF0ZShvYnMgPT4ge1xuICByZXF1ZXN0LmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBvYnMub25FcnJvcihlcnIpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9icy5vbk5leHQocmVzKVxuICAgIH1cbiAgICBvYnMub25Db21wbGV0ZWQoKVxuICB9KVxuXG4gIHJldHVybiAoKSA9PiByZXF1ZXN0LmFib3J0KClcbn0pXG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlQVBJUmVxdWVzdCAoe1xuICB0b2tlbixcbiAgbWV0aG9kLFxuICBxdWVyeSxcbiAgaHR0cE1ldGhvZCA9ICdQT1NUJ1xufSkge1xuICBsZXQgZW5kcG9pbnQgPSBgaHR0cHM6Ly9hcGkudGVsZWdyYW0ub3JnL2JvdCR7dG9rZW59YFxuICBsZXQgdXJsID0gYCR7ZW5kcG9pbnR9LyR7bWV0aG9kfWBcbiAgbGV0IHJlcSA9IHJlcXVlc3QoaHR0cE1ldGhvZCwgdXJsKVxuICAgIC5yZWRpcmVjdHMoMClcbiAgICAuc2VuZChxdWVyeSlcblxuICByZXR1cm4gZnJvbVN1cGVyYWdlbnQocmVxKVxuICAgIC5jYXRjaChlID0+IFJ4Lk9ic2VydmFibGUudGhyb3coZSBpbnN0YW5jZW9mIEVycm9yID8gZSA6IG5ldyBFcnJvcihlKSkpXG4gICAgLm1hcChyZXMgPT4gcmVzLmJvZHkpXG4gICAgLm1hcChcbiAgICAgIGJvZHkgPT4gYm9keS5vayA/IFJ4Lk9ic2VydmFibGUuanVzdChib2R5LnJlc3VsdClcbiAgICAgICAgOiBSeC5PYnNlcnZhYmxlLnRocm93KG5ldyBFcnJvcihib2R5KSkpXG4gICAgLnN3aXRjaCgpXG59XG4iXX0=