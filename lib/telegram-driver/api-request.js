'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAPIRequest = makeAPIRequest;

var _rx = require('rx');

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fromSuperagent = function fromSuperagent(request) {
  return _rx.Observable.create(function (obs) {
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
    return _rx.Observable.throw(e instanceof Error ? e : new Error(e));
  }).map(function (res) {
    return res.body;
  }).map(function (body) {
    return body.ok ? _rx.Observable.just(body.result) : _rx.Observable.throw(new Error(body));
  }).switch();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZWxlZ3JhbS1kcml2ZXIvYXBpLXJlcXVlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFnQmdCLGMsR0FBQSxjOztBQWhCaEI7O0FBQ0E7Ozs7OztBQUVBLElBQUksaUJBQWlCLFNBQWpCLGNBQWlCO0FBQUEsU0FBVyxlQUFFLE1BQUYsQ0FBUyxlQUFPO0FBQzlDLFlBQVEsR0FBUixDQUFZLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUN4QixVQUFJLEdBQUosRUFBUztBQUNQLFlBQUksT0FBSixDQUFZLEdBQVo7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJLE1BQUosQ0FBVyxHQUFYO0FBQ0Q7QUFDRCxVQUFJLFdBQUo7QUFDRCxLQVBEOztBQVNBLFdBQU87QUFBQSxhQUFNLFFBQVEsS0FBUixFQUFOO0FBQUEsS0FBUDtBQUNELEdBWCtCLENBQVg7QUFBQSxDQUFyQjs7QUFhTyxTQUFTLGNBQVQsT0FLSjtBQUFBLE1BSkQsS0FJQyxRQUpELEtBSUM7QUFBQSxNQUhELE1BR0MsUUFIRCxNQUdDO0FBQUEsTUFGRCxLQUVDLFFBRkQsS0FFQztBQUFBLDZCQURELFVBQ0M7QUFBQSxNQURELFVBQ0MsbUNBRFksTUFDWjs7QUFDRCxNQUFJLDRDQUEwQyxLQUE5QztBQUNBLE1BQUksTUFBUyxRQUFULFNBQXFCLE1BQXpCO0FBQ0EsTUFBSSxNQUFNLDBCQUFRLFVBQVIsRUFBb0IsR0FBcEIsRUFDUCxTQURPLENBQ0csQ0FESCxFQUVQLElBRk8sQ0FFRixLQUZFLENBQVY7O0FBSUEsU0FBTyxlQUFlLEdBQWYsRUFDSixLQURJLENBQ0U7QUFBQSxXQUFLLGVBQUUsS0FBRixDQUFRLGFBQWEsS0FBYixHQUFxQixDQUFyQixHQUF5QixJQUFJLEtBQUosQ0FBVSxDQUFWLENBQWpDLENBQUw7QUFBQSxHQURGLEVBRUosR0FGSSxDQUVBO0FBQUEsV0FBTyxJQUFJLElBQVg7QUFBQSxHQUZBLEVBR0osR0FISSxDQUlIO0FBQUEsV0FBUSxLQUFLLEVBQUwsR0FBVSxlQUFFLElBQUYsQ0FBTyxLQUFLLE1BQVosQ0FBVixHQUNKLGVBQUUsS0FBRixDQUFRLElBQUksS0FBSixDQUFVLElBQVYsQ0FBUixDQURKO0FBQUEsR0FKRyxFQU1KLE1BTkksRUFBUDtBQU9EIiwiZmlsZSI6ImFwaS1yZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyAkIH0gZnJvbSAncngnXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50J1xuXG5sZXQgZnJvbVN1cGVyYWdlbnQgPSByZXF1ZXN0ID0+ICQuY3JlYXRlKG9icyA9PiB7XG4gIHJlcXVlc3QuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIG9icy5vbkVycm9yKGVycilcbiAgICB9IGVsc2Uge1xuICAgICAgb2JzLm9uTmV4dChyZXMpXG4gICAgfVxuICAgIG9icy5vbkNvbXBsZXRlZCgpXG4gIH0pXG5cbiAgcmV0dXJuICgpID0+IHJlcXVlc3QuYWJvcnQoKVxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VBUElSZXF1ZXN0ICh7XG4gIHRva2VuLFxuICBtZXRob2QsXG4gIHF1ZXJ5LFxuICBodHRwTWV0aG9kID0gJ1BPU1QnXG59KSB7XG4gIGxldCBlbmRwb2ludCA9IGBodHRwczovL2FwaS50ZWxlZ3JhbS5vcmcvYm90JHt0b2tlbn1gXG4gIGxldCB1cmwgPSBgJHtlbmRwb2ludH0vJHttZXRob2R9YFxuICBsZXQgcmVxID0gcmVxdWVzdChodHRwTWV0aG9kLCB1cmwpXG4gICAgLnJlZGlyZWN0cygwKVxuICAgIC5zZW5kKHF1ZXJ5KVxuXG4gIHJldHVybiBmcm9tU3VwZXJhZ2VudChyZXEpXG4gICAgLmNhdGNoKGUgPT4gJC50aHJvdyhlIGluc3RhbmNlb2YgRXJyb3IgPyBlIDogbmV3IEVycm9yKGUpKSlcbiAgICAubWFwKHJlcyA9PiByZXMuYm9keSlcbiAgICAubWFwKFxuICAgICAgYm9keSA9PiBib2R5Lm9rID8gJC5qdXN0KGJvZHkucmVzdWx0KVxuICAgICAgICA6ICQudGhyb3cobmV3IEVycm9yKGJvZHkpKSlcbiAgICAuc3dpdGNoKClcbn1cbiJdfQ==