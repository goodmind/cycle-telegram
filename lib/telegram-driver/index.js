"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var telegram_driver_1 = require('./telegram-driver');
exports.makeTelegramDriver = telegram_driver_1.makeTelegramDriver;
var entities_1 = require('./entities');
exports.getEntityFirst = entities_1.getEntityFirst;
exports.getEntityFirstValue = entities_1.getEntityFirstValue;
exports.entityIs = entities_1.entityIs;
__export(require('./sinks'));
__export(require('../runtime-types'));
//# sourceMappingURL=index.js.map