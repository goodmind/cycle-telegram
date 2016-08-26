"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var ramda_1 = require('ramda');
__export(require('./entities'));
exports.defaults = ramda_1.curryN(2, function (transformations, obj) { return ramda_1.compose(ramda_1.evolve(transformations), ramda_1.pickAll)(ramda_1.chain(ramda_1.keys, [transformations, obj]), obj); });
//# sourceMappingURL=index.js.map