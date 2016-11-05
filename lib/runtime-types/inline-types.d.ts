import * as t from 'tcomb';
import * as k from './keyboard-types';
export declare const InputMessageContent: t.Struct<TcombInputMessageContent>;
export interface TcombInputMessageContent {
    message_text: string;
    parse_mode?: string;
    disable_web_page_preview?: boolean;
}
export interface BaseInlineQueryResult {
    type: string;
    id: string;
    reply_markup?: k.TcombInlineKeyboardMarkup;
    input_message_content?: TcombInputMessageContent;
}
export declare const InlineQueryResultCachedAudio: t.Struct<TcombInlineQueryResultCachedAudio>;
export interface TcombInlineQueryResultCachedAudio extends BaseInlineQueryResult {
    type: 'audio';
    audio_file_id: string;
    caption?: string;
}
export declare const InlineQueryResultCachedDocument: t.Struct<TcombInlineQueryResultCachedDocument>;
export interface TcombInlineQueryResultCachedDocument extends BaseInlineQueryResult {
    type: 'document';
    title: string;
    document_file_id: string;
    description?: string;
    caption?: string;
}
export declare const InlineQueryResultCachedGif: t.Struct<TcombInlineQueryResultCachedGif>;
export interface TcombInlineQueryResultCachedGif extends BaseInlineQueryResult {
}
export declare const InlineQueryResultCachedMpeg4Gif: t.Struct<TcombInlineQueryResultCachedMpeg4Gif>;
export interface TcombInlineQueryResultCachedMpeg4Gif extends BaseInlineQueryResult {
}
export declare const InlineQueryResultCachedPhoto: t.Struct<TcombInlineQueryResultCachedPhoto>;
export interface TcombInlineQueryResultCachedPhoto extends BaseInlineQueryResult {
}
export declare const InlineQueryResultCachedSticker: t.Struct<TcombInlineQueryResultCachedSticker>;
export interface TcombInlineQueryResultCachedSticker extends BaseInlineQueryResult {
}
export declare const InlineQueryResultCachedVideo: t.Struct<TcombInlineQueryResultCachedVideo>;
export interface TcombInlineQueryResultCachedVideo extends BaseInlineQueryResult {
}
export declare const InlineQueryResultCachedVoice: t.Struct<TcombInlineQueryResultCachedVoice>;
export interface TcombInlineQueryResultCachedVoice extends BaseInlineQueryResult {
}
export declare const InlineQueryResultArticle: t.Struct<TcombInlineQueryResultArticle>;
export interface TcombInlineQueryResultArticle extends BaseInlineQueryResult {
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
export interface TcombInlineQueryResultAudio extends BaseInlineQueryResult {
}
export declare const InlineQueryResultContact: t.Struct<TcombInlineQueryResultContact>;
export interface TcombInlineQueryResultContact extends BaseInlineQueryResult {
}
export declare const InlineQueryResultGame: t.Struct<TcombInlineQueryResultGame>;
export interface TcombInlineQueryResultGame extends BaseInlineQueryResult {
    type: 'game';
    game_short_name: string;
}
export declare const InlineQueryResultDocument: t.Struct<TcombInlineQueryResultDocument>;
export interface TcombInlineQueryResultDocument extends BaseInlineQueryResult {
}
export declare const InlineQueryResultGif: t.Struct<TcombInlineQueryResultGif>;
export interface TcombInlineQueryResultGif extends BaseInlineQueryResult {
}
export declare const InlineQueryResultLocation: t.Struct<TcombInlineQueryResultLocation>;
export interface TcombInlineQueryResultLocation extends BaseInlineQueryResult {
}
export declare const InlineQueryResultMpeg4Gif: t.Struct<TcombInlineQueryResultMpeg4Gif>;
export interface TcombInlineQueryResultMpeg4Gif extends BaseInlineQueryResult {
}
export declare const InlineQueryResultPhoto: t.Struct<TcombInlineQueryResultPhoto>;
export interface TcombInlineQueryResultPhoto extends BaseInlineQueryResult {
}
export declare const InlineQueryResultVenue: t.Struct<TcombInlineQueryResultVenue>;
export interface TcombInlineQueryResultVenue extends BaseInlineQueryResult {
}
export declare const InlineQueryResultVideo: t.Struct<TcombInlineQueryResultVideo>;
export interface TcombInlineQueryResultVideo extends BaseInlineQueryResult {
}
export declare const InlineQueryResultVoice: t.Struct<TcombInlineQueryResultVoice>;
export interface TcombInlineQueryResultVoice extends BaseInlineQueryResult {
}
export declare const InlineQueryResult: t.Union<TcombInlineQueryResult>;
export declare type TcombInlineQueryResult = TcombInlineQueryResultCachedAudio | TcombInlineQueryResultCachedDocument | TcombInlineQueryResultCachedGif | TcombInlineQueryResultCachedMpeg4Gif | TcombInlineQueryResultCachedPhoto | TcombInlineQueryResultCachedSticker | TcombInlineQueryResultCachedVideo | TcombInlineQueryResultCachedVoice | TcombInlineQueryResultArticle | TcombInlineQueryResultAudio | TcombInlineQueryResultContact | TcombInlineQueryResultGame | TcombInlineQueryResultDocument | TcombInlineQueryResultGif | TcombInlineQueryResultLocation | TcombInlineQueryResultMpeg4Gif | TcombInlineQueryResultPhoto | TcombInlineQueryResultVenue | TcombInlineQueryResultVideo | TcombInlineQueryResultVoice;
