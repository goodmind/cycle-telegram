import * as t from 'tcomb';
import { TcombCallbackGame } from './types';
export declare const KeyboardButton: t.Struct<TcombKeyboardButton>;
export interface TcombKeyboardButton {
    text: string;
    request_contact?: boolean;
    request_location?: boolean;
}
export declare const ReplyKeyboardMarkup: t.Struct<TcombReplyKeyboardMarkup>;
export interface TcombReplyKeyboardMarkup {
    keyboard: TcombKeyboardButton[][];
    resize_keyboard?: boolean;
    one_time_keyboard?: boolean;
    selective?: boolean;
}
export declare const ReplyKeyboardRemove: t.Struct<TcombReplyKeyboardRemove>;
export interface TcombReplyKeyboardRemove {
    hide_keyboard: boolean;
    selective?: boolean;
}
export declare const InlineKeyboardButton: t.Struct<TcombInlineKeyboardButton>;
export interface TcombInlineKeyboardButton {
    text: string;
    url?: string;
    callback_data?: string;
    callback_game?: TcombCallbackGame;
    switch_inline_query?: string;
    switch_inline_query_current_chat?: string;
}
export declare const InlineKeyboardMarkup: t.Struct<TcombInlineKeyboardMarkup>;
export interface TcombInlineKeyboardMarkup {
    inline_keyboard: TcombInlineKeyboardButton[][];
}
export declare const ForceReply: t.Struct<TcombForceReply>;
export interface TcombForceReply {
    force_reply: boolean;
    selective?: boolean;
}
