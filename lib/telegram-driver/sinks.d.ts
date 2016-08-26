import { Update } from '../interfaces';
import { TcombRequest, TcombWebhookResponse } from '../runtime-types';
export declare let webhook: (update: Update) => TcombWebhookResponse;
export declare let broadcast: Function;
export declare let reply: Function;
export declare let answerInlineQuery: Function;
export declare let answerCallbackQuery: Function;
export declare let setWebhook: (options?: {}) => TcombRequest;
export declare let forwardMessage: Function;
export declare let sendPhoto: Function;
export declare let sendAudio: Function;
export declare let sendDocument: Function;
export declare let sendSticker: Function;
export declare let sendVideo: Function;
export declare let sendVoice: Function;
export declare let sendLocation: Function;
export declare let sendVenue: Function;
export declare let sendContact: Function;
export declare let getUserProfilePhotos: Function;
export declare let getFile: Function;
export declare let leaveChat: Function;
export declare let unbanChatMember: Function;
export declare let getChat: Function;
export declare let getChatAdministrators: Function;
export declare let getChatMembersCount: Function;
export declare let getChatMember: Function;
export declare let editMessageText: Function;
export declare let editMessageCaption: Function;
export declare let editMessageReplyMarkup: Function;