import * as t from 'tcomb';
import { Update as TcombUpdate } from '../interfaces';
export declare const User: t.Struct<{}>;
export declare const Chat: t.Struct<{}>;
export declare const InputMessageContent: t.Struct<{}>;
export declare const InlineQueryResult: t.Struct<{}>;
export declare const InlineQueryResultArticle: t.Struct<{}>;
export declare const MessageEntity: t.Struct<{}>;
export declare const Message: t.Declare<{}>;
export declare const InlineQuery: t.Struct<{}>;
export declare const ChosenInlineResult: t.Struct<{}>;
export declare const CallbackQuery: t.Struct<{}>;
export declare const Update: t.Struct<{}>;
export declare const UpdateInlineQuery: t.Refinement<any>;
export declare const UpdateMessage: t.Refinement<any>;
export declare const UpdateChosenInlineResult: t.Refinement<any>;
export declare const UpdateCallbackQuery: t.Refinement<any>;
export declare const UpdatesState: t.Struct<{}>;
export declare const Request: t.Struct<TcombRequest>;
export interface TcombRequest {
    type: 'sink';
    multipart?: boolean;
    method: string;
    options: any;
}
export declare const WebhookResponse: t.Struct<TcombWebhookResponse>;
export interface TcombWebhookResponse {
    type: 'webhook';
    update: TcombUpdate;
}
