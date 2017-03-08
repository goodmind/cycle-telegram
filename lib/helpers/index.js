"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_adapter_1 = require("@cycle/rxjs-adapter");
var ramda_1 = require("ramda");
__export(require("./entities"));
function isWebhookResponse(request, options) {
    return options.webhook;
}
exports.isWebhookResponse = isWebhookResponse;
function isObservable(o) {
    return o && ramda_1.is(Function, o.subscribe);
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
        return convertStream(stream, rxjs_adapter_1.default, runSA);
    }
    function adaptFunction(func) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return adaptStream(func.apply(void 0, args));
        };
    }
    return adapt;
}
exports.adapter = adapter;
exports.defaults = ramda_1.curryN(2, function (transformations, obj) { return ramda_1.compose(ramda_1.evolve(transformations), ramda_1.pickAll)(ramda_1.chain(ramda_1.keys, [transformations, obj]), obj); });
//# sourceMappingURL=index.js.map