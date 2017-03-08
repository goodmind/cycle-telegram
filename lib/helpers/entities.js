"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
exports.entityIs = ramda_1.useWith(ramda_1.any, [
    ramda_1.propEq('type'),
    ramda_1.pipe(ramda_1.path(['message', 'entities']), ramda_1.defaultTo([]))
]);
exports.getEntityFirst = ramda_1.useWith(ramda_1.find, [
    ramda_1.propEq('type'),
    ramda_1.pipe(ramda_1.path(['message', 'entities']), ramda_1.defaultTo([]))
]);
exports.getEntityFirstValue = ramda_1.curryN(2, function (type, update) {
    var match = exports.getEntityFirst(type, update);
    return update.message.text.substr(match.offset, match.length);
});
//# sourceMappingURL=entities.js.map