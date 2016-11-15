"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var rx_adapter_1 = require("@cycle/rx-adapter");
var ramda_1 = require("ramda");
var rx_1 = require("rx");
__export(require("./entities"));
function isWebhookResponse(request, options) {
    return options.webhook;
}
exports.isWebhookResponse = isWebhookResponse;
function isObservable(o) {
    return rx_1.Observable.isObservable(o);
}
exports.isObservable = isObservable;
function convertStream(stream, sourceSA, targetSA) {
    return targetSA.isValidStream(stream)
        ? stream
        : targetSA.adapt(stream, sourceSA.streamSubscribe);
}
exports.convertStream = convertStream;
function adapter(runSA) {
    var adapt = ramda_1.ifElse(isObservable, adaptStream, ramda_1.ifElse(ramda_1.is(Function), adaptFunction, ramda_1.identity));
    function adaptStream(stream) {
        return convertStream(stream, rx_adapter_1.default, runSA);
    }
    function adaptFunction(func) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return adaptStream(func.apply(void 0, args));
        };
    }
    return adapt;
}
exports.adapter = adapter;
exports.defaults = ramda_1.curryN(2, function (transformations, obj) { return ramda_1.compose(ramda_1.evolve(transformations), ramda_1.pickAll)(ramda_1.chain(ramda_1.keys, [transformations, obj]), obj); });
//# sourceMappingURL=index.js.map