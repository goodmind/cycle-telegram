import * as t from 'tcomb';
export declare const User: t.Struct<TcombUser>;
export interface TcombUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
}
export declare const Chat: t.Struct<TcombChat>;
export interface TcombChat {
    id: number;
    type: 'private' | 'group' | 'supergroup' | 'channel';
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}
export declare const InputMessageContent: t.Struct<{}>;
export declare const InlineQueryResult: t.Struct<{}>;
export declare const InlineQueryResultArticle: t.Struct<{}>;
export declare const MessageEntity: t.Struct<{}>;
export declare const Message: t.Declare<{}>;
export interface TcombMessage {
    message_id: number;
    from?: TcombUser;
    date: number;
    chat: TcombChat;
    forward_from?: any;
    forward_date?: number;
    reply_to_message?: TcombMessage;
    text?: string;
    entities?: any[];
    audio?: any;
    document?: any;
    photo?: any[];
    sticker?: any;
    video?: any;
    voice?: any;
    caption?: string;
    contact?: any;
    location?: any;
    new_chat_member?: TcombUser;
    left_chat_member?: TcombUser;
    new_chat_title?: string;
    new_chat_photo?: any[];
    delete_chat_photo?: boolean;
    group_chat_created?: boolean;
    supergroup_chat_created?: boolean;
    channel_chat_created?: boolean;
    migrate_to_chat_id?: number;
    migrate_from_chat_id?: number;
    pinned_message?: TcombMessage;
}
export declare const InlineQuery: t.Struct<TcombInlineQuery>;
export interface TcombInlineQuery {
    id: string;
    from: TcombUser;
    location?: any;
    query: string;
    offset: string;
}
export declare const ChosenInlineResult: t.Struct<TcombChosenInlineResult>;
export interface TcombChosenInlineResult {
    result_id: string;
    from: TcombUser;
    location?: any;
    inline_message_id?: string;
    query: string;
}
export declare const CallbackQuery: t.Struct<TcombCallbackQuery>;
export interface TcombCallbackQuery {
    id: string;
    from: TcombUser;
    message?: TcombMessage;
    inline_message_id?: string;
    data?: string;
}
export declare const Update: t.Struct<TcombUpdate>;
export interface TcombUpdate {
    update_id: number;
    message?: TcombMessage;
    inline_query?: TcombInlineQuery;
    chosen_inline_result?: TcombChosenInlineResult;
    callback_query?: TcombCallbackQuery;
}
export declare const UpdateInlineQuery: t.Refinement<TcombUpdateInlineQuery>;
export interface TcombUpdateInlineQuery {
    update_id: number;
    inline_query: TcombInlineQuery;
}
export declare const UpdateMessage: t.Refinement<TcombUpdateMessage>;
export interface TcombUpdateMessage {
    update_id: number;
    message: TcombMessage;
}
export declare const UpdateChosenInlineResult: t.Refinement<TcombUpdateChosenInlineResult>;
export interface TcombUpdateChosenInlineResult {
    update_id: number;
    chosen_inline_result: TcombChosenInlineResult;
}
export declare const UpdateCallbackQuery: t.Refinement<TcombUpdateCallbackQuery>;
export interface TcombUpdateCallbackQuery {
    update_id: number;
    callback_query: TcombCallbackQuery;
}
export declare const UpdatesState: t.Struct<TcombUpdatesState>;
export interface TcombUpdatesState {
    startDate: number;
    offset: number;
    updates: TcombUpdate[];
}
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
