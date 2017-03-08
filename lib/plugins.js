"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var rx_adapter_1 = require("@cycle/rx-adapter");
var isolate_1 = require("@cycle/isolate");
var t = require("tcomb");
var telegram_driver_1 = require("./telegram-driver");
var helpers_1 = require("./helpers");
var UpdateMessageCommand = t.refinement(telegram_driver_1.UpdateMessage, ramda_1.compose(ramda_1.not, ramda_1.isNil, telegram_driver_1.getEntityFirst('bot_command')), 'UpdateMessageCommand');
var UpdateMessageText = t.refinement(telegram_driver_1.UpdateMessage, ramda_1.compose(ramda_1.not, ramda_1.isNil, function (u) { return u.message.text; }), 'UpdateMessageText');
var getQuery = function (update) { return t.match(update, UpdateMessageCommand, function (u) { return u.message.text.substr(telegram_driver_1.getEntityFirst('bot_command', u).offset); }, UpdateMessageText, function (u) { return update.message.text; }, telegram_driver_1.UpdateInlineQuery, function (u) { return update.inline_query.query; }, t.Any, function () { return null; }); };
var matchPattern = ramda_1.curryN(2, function (query, _a) {
    var pattern = _a.pattern;
    return pattern ? ramda_1.match(pattern, query) : [];
});
var testPattern = ramda_1.curryN(2, function (query, _a) {
    var pattern = _a.pattern;
    return pattern ? ramda_1.test(pattern, query) : false;
});
var getProps = matchPattern;
var toProps = ramda_1.curryN(2, function (query, plugin) {
    return ({ plugin: plugin, props: getProps(query, plugin) });
});
var toIsolate = ramda_1.curryN(3, function (update, sources, _a) {
    var plugin = _a.plugin, props = _a.props;
    return isolate_1.default(plugin.component)(ramda_1.merge({ props: props }, sources), update);
});
var isolatePlugin = ramda_1.curryN(4, function (update, sources, query, plugin) { return toIsolate(update, sources, toProps(query, plugin)); });
var transform = function (plugins, sources, update, pluginNotFound) { return ramda_1.map(isolatePlugin(update, sources, getQuery(update)), ramda_1.when(ramda_1.isEmpty, function () { return [pluginNotFound]; }, ramda_1.filter(ramda_1.prop('pattern'), plugins))); };
var makeComponentSelector = ramda_1.curryN(4, function (f, update, plugins, sources) { return ramda_1.when(ramda_1.isNil, function () { return []; }, transform(f(getQuery(update), plugins), sources, update, ramda_1.last(plugins))); });
var toComponents = makeComponentSelector(function (query, plugins) {
    return ramda_1.filter(testPattern(query), plugins);
});
var toComponent = makeComponentSelector(function (query, plugins) {
    return [ramda_1.find(testPattern(query), plugins)];
});
function makePlugins(externalSA) {
    if (externalSA === void 0) { externalSA = rx_adapter_1.default; }
    function matchWith(plugins, sources, _a) {
        var _b = (_a === void 0 ? { dupe: true } : _a).dupe, dupe = _b === void 0 ? true : _b;
        return helpers_1.convertStream(helpers_1.convertStream(this, externalSA, rx_adapter_1.default)
            .map(function (u) { return dupe ? toComponents(u) : toComponent(u); })
            .flatMap(function (f) { return f(plugins, sources); })
            .filter(ramda_1.prop('bot')), rx_adapter_1.default, externalSA);
    }
    function matchStream(sourceObservable) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return matchWith.apply(helpers_1.convertStream(sourceObservable, externalSA, rx_adapter_1.default), args);
    }
    return { matchWith: matchWith, matchStream: matchStream };
}
exports.makePlugins = makePlugins;
exports.matchWith = (_a = makePlugins(), _a.matchWith), exports.matchStream = _a.matchStream;
var _a;
//# sourceMappingURL=plugins.js.map