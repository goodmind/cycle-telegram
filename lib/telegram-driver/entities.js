"use strict";
var ramda_1 = require('ramda');
exports.entityIs = ramda_1.curryN(2, function (type, update) { return ramda_1.pipe(ramda_1.view(ramda_1.lensPath(['message', 'entities'])), ramda_1.ifElse(ramda_1.isArrayLike, ramda_1.any(ramda_1.propEq('type', type)), ramda_1.pipe(ramda_1.not, ramda_1.isNil)))(update); });
exports.getEntityFirst = ramda_1.curryN(2, function (type, update) { return ramda_1.pipe(ramda_1.view(ramda_1.lensPath(['message', 'entities'])), ramda_1.defaultTo([]), ramda_1.find(ramda_1.propEq('type', type)))(update); });
exports.getEntityFirstValue = ramda_1.curryN(2, function (type, update) {
    var match = exports.getEntityFirst(type, update);
    return update.message.text.substr(match.offset, match.length);
});
//# sourceMappingURL=entities.js.map