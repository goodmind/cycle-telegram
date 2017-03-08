"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_types_1 = require("../runtime-types");
/* tslint:enable */
var ramda_1 = require("ramda");
var helpers_1 = require("../helpers");
var curryN = function (n, func) { return ramda_1.curry(func); };
exports.webhook = function (update) { return runtime_types_1.WebhookResponse({
    type: 'webhook',
    update: update
}); };
// TODO: stricter types
exports.setWebhook = function (options) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'setWebhook',
        options: options
    });
};
// TODO: stricter types
exports.getWebhookInfo = function (options) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'getWebhookInfo',
        options: options
    });
};
// TODO: stricter types
exports.getMe = function (options) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'getMe',
        options: options
    });
};
exports.broadcast = curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'sendMessage',
        options: helpers_1.defaults({
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            text: ramda_1.defaultTo('Null-catch: no text provided'),
            reply_markup: JSON.stringify
        }, options)
    });
});
exports.reply = curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'sendMessage',
        options: helpers_1.defaults({
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            reply_to_message_id: ramda_1.defaultTo(ramda_1.path(['message', 'message_id'], update)),
            text: ramda_1.defaultTo('Null-catch: no text provided'),
            reply_markup: JSON.stringify
        }, ramda_1.is(String, options) ? { text: options } : options)
    });
});
exports.forwardMessage = curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'forwardMessage',
        options: helpers_1.defaults({
            from_chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            message_id: ramda_1.defaultTo(ramda_1.path(['message', 'message_id'], update))
        }, ramda_1.is(Number, options) ? { chat_id: options } : options)
    });
});
/* tslint:disable:variable-name */
exports.sendPhoto = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, photo = _a.photo, _b = _a.caption, caption = _b === void 0 ? null : _b, _c = _a.disable_notification, disable_notification = _c === void 0 ? null : _c, _d = _a.reply_to_message_id, reply_to_message_id = _d === void 0 ? null : _d, _e = _a.reply_markup, reply_markup = _e === void 0 ? {} : _e;
    var options = {
        chat_id: chat_id,
        photo: photo,
        caption: caption,
        disable_notification: disable_notification,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        multipart: true,
        method: 'sendPhoto',
        options: helpers_1.defaults({
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            reply_markup: JSON.stringify
        }, options)
    });
});
exports.sendAudio = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, audio = _a.audio, _b = _a.duration, duration = _b === void 0 ? null : _b, _c = _a.performer, performer = _c === void 0 ? null : _c, _d = _a.title, title = _d === void 0 ? null : _d, _e = _a.disable_notification, disable_notification = _e === void 0 ? null : _e, _f = _a.reply_to_message_id, reply_to_message_id = _f === void 0 ? null : _f, _g = _a.reply_markup, reply_markup = _g === void 0 ? {} : _g;
    var options = {
        chat_id: chat_id,
        audio: audio,
        duration: duration,
        performer: performer,
        title: title,
        disable_notification: disable_notification,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        multipart: true,
        method: 'sendAudio',
        options: helpers_1.defaults({ reply_markup: JSON.stringify }, options)
    });
});
exports.sendDocument = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, document = _a.document, _b = _a.caption, caption = _b === void 0 ? null : _b, _c = _a.disable_notification, disable_notification = _c === void 0 ? null : _c, _d = _a.reply_to_message_id, reply_to_message_id = _d === void 0 ? null : _d, _e = _a.reply_markup, reply_markup = _e === void 0 ? {} : _e;
    var options = {
        chat_id: chat_id,
        document: document,
        caption: caption,
        disable_notification: disable_notification,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        multipart: true,
        method: 'sendDocument',
        options: helpers_1.defaults({ reply_markup: JSON.stringify }, options)
    });
});
exports.sendSticker = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, sticker = _a.sticker, _b = _a.disable_notification, disable_notification = _b === void 0 ? null : _b, _c = _a.reply_to_message_id, reply_to_message_id = _c === void 0 ? null : _c, _d = _a.reply_markup, reply_markup = _d === void 0 ? {} : _d;
    var options = {
        chat_id: chat_id,
        sticker: sticker,
        disable_notification: disable_notification,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        multipart: true,
        method: 'sendSticker',
        options: helpers_1.defaults({ reply_markup: JSON.stringify }, options)
    });
});
exports.sendVideo = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, video = _a.video, _b = _a.duration, duration = _b === void 0 ? null : _b, _c = _a.width, width = _c === void 0 ? null : _c, _d = _a.height, height = _d === void 0 ? null : _d, _e = _a.caption, caption = _e === void 0 ? null : _e, _f = _a.disable_notification, disable_notification = _f === void 0 ? null : _f, _g = _a.reply_to_message_id, reply_to_message_id = _g === void 0 ? null : _g, _h = _a.reply_markup, reply_markup = _h === void 0 ? {} : _h;
    var options = {
        chat_id: chat_id,
        video: video,
        duration: duration,
        width: width,
        height: height,
        caption: caption,
        disable_notification: disable_notification,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        multipart: true,
        method: 'sendVideo',
        options: helpers_1.defaults({ reply_markup: JSON.stringify }, options)
    });
});
exports.sendVoice = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, voice = _a.voice, _b = _a.duration, duration = _b === void 0 ? null : _b, _c = _a.disable_notification, disable_notification = _c === void 0 ? null : _c, _d = _a.reply_to_message_id, reply_to_message_id = _d === void 0 ? null : _d, _e = _a.reply_markup, reply_markup = _e === void 0 ? {} : _e;
    var options = {
        chat_id: chat_id,
        voice: voice,
        duration: duration,
        disable_notification: disable_notification,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        multipart: true,
        method: 'sendVoice',
        options: helpers_1.defaults({ reply_markup: JSON.stringify }, options)
    });
});
exports.sendLocation = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, latitude = _a.latitude, longitude = _a.longitude, _b = _a.disable_notification, disable_notification = _b === void 0 ? null : _b, _c = _a.reply_to_message_id, reply_to_message_id = _c === void 0 ? null : _c, _d = _a.reply_markup, reply_markup = _d === void 0 ? {} : _d;
    var options = {
        chat_id: chat_id,
        latitude: latitude,
        longitude: longitude,
        disable_notification: disable_notification,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'sendLocation',
        options: helpers_1.defaults({ reply_markup: JSON.stringify }, options)
    });
});
exports.sendVenue = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, latitude = _a.latitude, longitude = _a.longitude, title = _a.title, address = _a.address, _b = _a.foursquare_id, foursquare_id = _b === void 0 ? null : _b, _c = _a.disable_notification, disable_notification = _c === void 0 ? null : _c, _d = _a.reply_to_message_id, reply_to_message_id = _d === void 0 ? null : _d, _e = _a.reply_markup, reply_markup = _e === void 0 ? {} : _e;
    var options = {
        chat_id: chat_id,
        latitude: latitude,
        longitude: longitude,
        title: title,
        address: address,
        foursquare_id: foursquare_id,
        disable_notification: disable_notification,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'sendVenue',
        options: helpers_1.defaults({ reply_markup: JSON.stringify }, options)
    });
});
exports.sendContact = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, phone_number = _a.phone_number, first_name = _a.first_name, _b = _a.last_name, last_name = _b === void 0 ? null : _b, _c = _a.disable_notification, disable_notification = _c === void 0 ? null : _c, _d = _a.reply_to_message_id, reply_to_message_id = _d === void 0 ? null : _d, _e = _a.reply_markup, reply_markup = _e === void 0 ? {} : _e;
    var options = {
        chat_id: chat_id,
        phone_number: phone_number,
        first_name: first_name,
        last_name: last_name,
        disable_notification: disable_notification,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'sendContact',
        options: helpers_1.defaults({ reply_markup: JSON.stringify }, options)
    });
});
exports.sendChatAction = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, action = _a.action;
    var options = {
        chat_id: chat_id,
        action: action
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'sendChatAction',
        options: options
    });
});
exports.getUserProfilePhotos = curryN(2, function (_a, update) {
    var user_id = _a.user_id, _b = _a.offset, offset = _b === void 0 ? null : _b, _c = _a.limit, limit = _c === void 0 ? null : _c;
    var options = {
        user_id: user_id,
        offset: offset,
        limit: limit
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'getUserProfilePhotos',
        options: options
    });
});
exports.getFile = curryN(2, function (_a, update) {
    var file_id = _a.file_id;
    var options = {
        file_id: file_id
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'getFile',
        options: options
    });
});
exports.kickChatMember = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, user_id = _a.user_id;
    var options = {
        chat_id: chat_id,
        user_id: user_id
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'kickChatMember',
        options: options
    });
});
exports.leaveChat = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id;
    var options = {
        chat_id: chat_id
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'leaveChat',
        options: options
    });
});
exports.unbanChatMember = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, user_id = _a.user_id;
    var options = {
        chat_id: chat_id,
        user_id: user_id
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'unbanChatMember',
        options: options
    });
});
exports.getChat = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id;
    var options = {
        chat_id: chat_id
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'getChat',
        options: options
    });
});
exports.getChatAdministrators = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id;
    var options = {
        chat_id: chat_id
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'getChatAdministrators',
        options: options
    });
});
exports.getChatMembersCount = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id;
    var options = {
        chat_id: chat_id
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'getChatMembersCount',
        options: options
    });
});
exports.getChatMember = curryN(2, function (_a, update) {
    var chat_id = _a.chat_id, user_id = _a.user_id;
    var options = {
        chat_id: chat_id,
        user_id: user_id
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'getChatMember',
        options: options
    });
});
// TODO: stricter types
exports.answerCallbackQuery = curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'answerCallbackQuery',
        options: helpers_1.defaults({ callback_query_id: ramda_1.defaultTo(ramda_1.path(['callback_query', 'id'], update)) }, options)
    });
});
// TODO: stricter types
exports.editMessageText = curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'editMessageText',
        options: helpers_1.defaults({
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            message_id: ramda_1.defaultTo(ramda_1.path(['message', 'message_id'], update)),
            text: ramda_1.defaultTo('Null-catch: no text provided'),
            reply_markup: JSON.stringify
        }, options)
    });
});
exports.editMessageCaption = curryN(2, function (_a, update) {
    var _b = _a.caption, caption = _b === void 0 ? null : _b, _c = _a.reply_markup, reply_markup = _c === void 0 ? {} : _c;
    var options = {
        caption: caption,
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'editMessageCaption',
        options: helpers_1.defaults({
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            message_id: ramda_1.defaultTo(ramda_1.path(['message', 'message_id'], update)),
            reply_markup: JSON.stringify
        }, options)
    });
});
exports.editMessageReplyMarkup = curryN(2, function (_a, update) {
    var _b = _a.reply_markup, reply_markup = _b === void 0 ? {} : _b;
    var options = {
        reply_markup: reply_markup
    };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'editMessageReplyMarkup',
        options: helpers_1.defaults({
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            message_id: ramda_1.defaultTo(ramda_1.path(['message', 'message_id'], update)),
            reply_markup: JSON.stringify
        }, options)
    });
});
// TODO: stricter types
exports.answerInlineQuery = curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    var updateResults = function (results) { return results[0].id ? results : ramda_1.map(function (answer) { return ramda_1.assoc('id', Math.random().toString(36).substring(2), answer); }, results || []); };
    return runtime_types_1.Request({
        type: 'sink',
        method: 'answerInlineQuery',
        options: helpers_1.defaults({
            inline_query_id: ramda_1.defaultTo(ramda_1.path(['inline_query', 'id'], update)),
            results: ramda_1.compose(JSON.stringify, updateResults)
        }, ramda_1.isArrayLike(options) ? { results: options } : options)
    });
});
exports.sendGame = curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'sendGame',
        options: helpers_1.defaults({
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update)),
            reply_markup: JSON.stringify
        }, options)
    });
});
exports.setGameScore = curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'setGameScore',
        options: helpers_1.defaults({
            user_id: ramda_1.defaultTo(ramda_1.path(['message', 'from', 'id'], update)),
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update))
        }, options)
    });
});
exports.getGameHighScores = curryN(2, function (options, update) {
    if (options === void 0) { options = {}; }
    return runtime_types_1.Request({
        type: 'sink',
        method: 'getGameHighScores',
        options: helpers_1.defaults({
            user_id: ramda_1.defaultTo(ramda_1.path(['message', 'from', 'id'], update)),
            chat_id: ramda_1.defaultTo(ramda_1.path(['message', 'chat', 'id'], update))
        }, options)
    });
});
//# sourceMappingURL=sinks.js.map