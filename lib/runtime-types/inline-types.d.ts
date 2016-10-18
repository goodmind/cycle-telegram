import * as t from 'tcomb';
import * as k from './keyboard-types';
export declare const InputMessageContent: t.Struct<TcombInputMessageContent>;
export interface TcombInputMessageContent {
    message_text: string;
    parse_mode?: string;
    disable_web_page_preview?: boolean;
}
export declare const InlineQueryResult: t.Struct<TcombInlineQueryResult>;
export interface TcombInlineQueryResult {
    type: string;
    id: string;
    reply_markup?: k.TcombInlineKeyboardMarkup;
    input_message_content?: TcombInputMessageContent;
}
export declare const InlineQueryResultCachedAudio: t.Struct<TcombInlineQueryResultCachedAudio>;
export interface TcombInlineQueryResultCachedAudio extends TcombInlineQueryResult {
    type: 'audio';
    audio_file_id: string;
    caption?: string;
}
export declare const InlineQueryResultCachedDocument: t.Struct<TcombInlineQueryResultCachedDocument>;
export interface TcombInlineQueryResultCachedDocument extends TcombInlineQueryResult {
    type: 'document';
    title: string;
    document_file_id: string;
    description?: string;
    caption?: string;
}
export declare const InlineQueryResultCachedGif: t.Struct<TcombInlineQueryResultCachedGif>;
export interface TcombInlineQueryResultCachedGif extends TcombInlineQueryResult {
}
export declare const InlineQueryResultCachedMpeg4Gif: t.Struct<TcombInlineQueryResultCachedMpeg4Gif>;
export interface TcombInlineQueryResultCachedMpeg4Gif extends TcombInlineQueryResult {
}
export declare const InlineQueryResultCachedPhoto: t.Struct<TcombInlineQueryResultCachedPhoto>;
export interface TcombInlineQueryResultCachedPhoto extends TcombInlineQueryResult {
}
export declare const InlineQueryResultCachedSticker: t.Struct<TcombInlineQueryResultCachedSticker>;
export interface TcombInlineQueryResultCachedSticker extends TcombInlineQueryResult {
}
export declare const InlineQueryResultCachedVideo: t.Struct<TcombInlineQueryResultCachedVideo>;
export interface TcombInlineQueryResultCachedVideo extends TcombInlineQueryResult {
}
export declare const InlineQueryResultCachedVoice: t.Struct<TcombInlineQueryResultCachedVoice>;
export interface TcombInlineQueryResultCachedVoice extends TcombInlineQueryResult {
}
export declare const InlineQueryResultArticle: t.Struct<TcombInlineQueryResultArticle>;
export interface TcombInlineQueryResultArticle extends TcombInlineQueryResult {
    type: 'article';
    title: string;
    input_message_content: TcombInputMessageContent;
    reply_markup?: k.TcombInlineKeyboardMarkup;
    url?: string;
    hide_url?: boolean;
    description?: string;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export declare const InlineQueryResultAudio: t.Struct<TcombInlineQueryResultAudio>;
export interface TcombInlineQueryResultAudio extends TcombInlineQueryResult {
}
export declare const InlineQueryResultContact: t.Struct<TcombInlineQueryResultContact>;
export interface TcombInlineQueryResultContact extends TcombInlineQueryResult {
}
export declare const InlineQueryResultGame: t.Struct<TcombInlineQueryResultGame>;
export interface TcombInlineQueryResultGame extends TcombInlineQueryResult {
}
export declare const InlineQueryResultDocument: t.Struct<TcombInlineQueryResultDocument>;
export interface TcombInlineQueryResultDocument extends TcombInlineQueryResult {
}
export declare const InlineQueryResultGif: t.Struct<TcombInlineQueryResultGif>;
export interface TcombInlineQueryResultGif extends TcombInlineQueryResult {
}
export declare const InlineQueryResultLocation: t.Struct<TcombInlineQueryResultLocation>;
export interface TcombInlineQueryResultLocation extends TcombInlineQueryResult {
}
export declare const InlineQueryResultMpeg4Gif: t.Struct<TcombInlineQueryResultMpeg4Gif>;
export interface TcombInlineQueryResultMpeg4Gif extends TcombInlineQueryResult {
}
export declare const InlineQueryResultPhoto: t.Struct<TcombInlineQueryResultPhoto>;
export interface TcombInlineQueryResultPhoto extends TcombInlineQueryResult {
}
export declare const InlineQueryResultVenue: t.Struct<TcombInlineQueryResultVenue>;
export interface TcombInlineQueryResultVenue extends TcombInlineQueryResult {
}
export declare const InlineQueryResultVideo: t.Struct<TcombInlineQueryResultVideo>;
export interface TcombInlineQueryResultVideo extends TcombInlineQueryResult {
}
export declare const InlineQueryResultVoice: t.Struct<TcombInlineQueryResultVoice>;
export interface TcombInlineQueryResultVoice extends TcombInlineQueryResult {
}
