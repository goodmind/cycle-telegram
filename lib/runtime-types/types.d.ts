import * as t from 'tcomb';
import * as m from './multimedia-types';
export declare const User: t.Struct<TcombUser>;
export interface TcombUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
}
export declare const ChatMember: t.Struct<TcombChatMember>;
export interface TcombChatMember {
    user: TcombUser;
    status: 'creator' | 'administrator' | 'member' | 'left' | 'kicked';
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
export declare const MessageEntity: t.Struct<TcombMessageEntity>;
export interface TcombMessageEntity {
    type: 'mention' | 'hashtag' | 'bot_command' | 'url' | 'email' | 'bold' | 'italic' | 'code' | 'pre' | 'text_link' | 'text_mention';
    offset: number;
    length: number;
    url?: string;
    user?: TcombUser;
}
export declare const Message: t.Declare<TcombMessage>;
export interface TcombMessage {
    message_id: number;
    from?: TcombUser;
    date: number;
    chat: TcombChat;
    forward_from?: TcombUser;
    forward_date?: number;
    reply_to_message?: TcombMessage;
    text?: string;
    entities?: TcombMessageEntity[];
    audio?: m.TcombAudio;
    document?: m.TcombDocument;
    photo?: m.TcombPhotoSize[];
    sticker?: m.TcombSticker;
    video?: m.TcombVideo;
    voice?: m.TcombVoice;
    caption?: string;
    contact?: m.TcombContact;
    location?: m.TcombLocation;
    venue?: m.TcombVenue;
    new_chat_member?: TcombUser;
    left_chat_member?: TcombUser;
    new_chat_title?: string;
    new_chat_photo?: m.TcombPhotoSize[];
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
    location?: m.TcombLocation;
    query: string;
    offset: string;
}
export declare const ChosenInlineResult: t.Struct<TcombChosenInlineResult>;
export interface TcombChosenInlineResult {
    result_id: string;
    from: TcombUser;
    location?: m.TcombLocation;
    inline_message_id?: string;
    query: string;
}
export declare const CallbackQuery: t.Struct<TcombCallbackQuery>;
export interface TcombCallbackQuery {
    id: string;
    from: TcombUser;
    message?: TcombMessage;
    inline_message_id?: string;
    chat_instance: string;
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
    returnType?: string;
    options: any;
}
export declare const WebhookInfo: t.Struct<TcombWebhookInfo>;
export interface TcombWebhookInfo {
    url: string;
    has_custom_certificate: boolean;
    pending_update_count: number;
    last_error_date?: number;
    last_error_message?: string;
}
export declare const WebhookResponse: t.Struct<TcombWebhookResponse>;
export interface TcombWebhookResponse {
    type: 'webhook';
    update: TcombUpdate;
}
