import * as t from 'tcomb';
import * as k from './keyboard-types';
export declare const InputTextMessageContent: t.Struct<TcombInputTextMessageContent>;
export interface TcombInputTextMessageContent {
    message_text: string;
    parse_mode?: 'Markdown' | 'HTML';
    disable_web_page_preview?: boolean;
}
export declare const InputLocationMessageContent: t.Struct<TcombInputLocationMessageContent>;
export interface TcombInputLocationMessageContent {
    latitude: number;
    longitude: number;
}
export declare const InputVenueMessageContent: t.Struct<TcombInputVenueMessageContent>;
export interface TcombInputVenueMessageContent {
    latitude: number;
    longitude: number;
    title: string;
    address: string;
    foursquare_id?: string;
}
export declare const InputContactMessageContent: t.Struct<TcombInputContactMessageContent>;
export interface TcombInputContactMessageContent {
    phone_number: string;
    first_name: string;
    last_name?: string;
}
export declare const InputMessageContent: t.Union<TcombInputMessageContent>;
export declare type TcombInputMessageContent = TcombInputTextMessageContent | TcombInputLocationMessageContent | TcombInputVenueMessageContent | TcombInputContactMessageContent;
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
    type: 'gif';
    gif_file_id: string;
    title?: string;
    caption?: string;
}
export declare const InlineQueryResultCachedMpeg4Gif: t.Struct<TcombInlineQueryResultCachedMpeg4Gif>;
export interface TcombInlineQueryResultCachedMpeg4Gif extends BaseInlineQueryResult {
    type: 'mpeg4_gif';
    mpeg4_file_id: string;
    title?: string;
    caption?: string;
}
export declare const InlineQueryResultCachedPhoto: t.Struct<TcombInlineQueryResultCachedPhoto>;
export interface TcombInlineQueryResultCachedPhoto extends BaseInlineQueryResult {
    type: 'photo';
    photo_file_id: string;
    title?: string;
    description?: string;
    caption?: string;
}
export declare const InlineQueryResultCachedSticker: t.Struct<TcombInlineQueryResultCachedSticker>;
export interface TcombInlineQueryResultCachedSticker extends BaseInlineQueryResult {
    type: 'sticker';
    sticker_file_id: string;
}
export declare const InlineQueryResultCachedVideo: t.Struct<TcombInlineQueryResultCachedVideo>;
export interface TcombInlineQueryResultCachedVideo extends BaseInlineQueryResult {
    type: 'video';
    video_file_id: string;
    title: string;
    description?: string;
    caption?: string;
}
export declare const InlineQueryResultCachedVoice: t.Struct<TcombInlineQueryResultCachedVoice>;
export interface TcombInlineQueryResultCachedVoice extends BaseInlineQueryResult {
    type: 'voice';
    voice_file_id: string;
    title: string;
    caption?: string;
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
    type: 'audio';
    audio_url: string;
    title: string;
    performer?: string;
    caption?: string;
    audio_duration?: number;
}
export declare const InlineQueryResultContact: t.Struct<TcombInlineQueryResultContact>;
export interface TcombInlineQueryResultContact extends BaseInlineQueryResult {
    type: 'contact';
    phone_number: string;
    first_name: string;
    last_name?: string;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export declare const InlineQueryResultGame: t.Struct<TcombInlineQueryResultGame>;
export interface TcombInlineQueryResultGame extends BaseInlineQueryResult {
    type: 'game';
    game_short_name: string;
}
export declare const InlineQueryResultDocument: t.Struct<TcombInlineQueryResultDocument>;
export interface TcombInlineQueryResultDocument extends BaseInlineQueryResult {
    type: 'document';
    title: string;
    caption?: string;
    document_url: string;
    description?: string;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export declare const InlineQueryResultGif: t.Struct<TcombInlineQueryResultGif>;
export interface TcombInlineQueryResultGif extends BaseInlineQueryResult {
    type: 'gif';
    gif_url: string;
    gif_width?: number;
    gif_height?: number;
    thumb_url: string;
    title?: string;
    caption?: string;
}
export declare const InlineQueryResultLocation: t.Struct<TcombInlineQueryResultLocation>;
export interface TcombInlineQueryResultLocation extends BaseInlineQueryResult {
    type: 'location';
    latitude: number;
    longitude: number;
    title: string;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export declare const InlineQueryResultMpeg4Gif: t.Struct<TcombInlineQueryResultMpeg4Gif>;
export interface TcombInlineQueryResultMpeg4Gif extends BaseInlineQueryResult {
    type: 'mpeg4_gif';
    mpeg4_url: string;
    mpeg4_width?: number;
    mpeg4_height?: number;
    thumb_url: string;
    title?: string;
    caption?: string;
}
export declare const InlineQueryResultPhoto: t.Struct<TcombInlineQueryResultPhoto>;
export interface TcombInlineQueryResultPhoto extends BaseInlineQueryResult {
    type: 'photo';
    photo_url: string;
    thumb_url: string;
    photo_width?: number;
    photo_height?: number;
    title?: string;
    description?: string;
    caption?: string;
}
export declare const InlineQueryResultVenue: t.Struct<TcombInlineQueryResultVenue>;
export interface TcombInlineQueryResultVenue extends BaseInlineQueryResult {
    type: 'venue';
    latitude: number;
    longitude: number;
    title: string;
    address: string;
    foursquare_id?: string;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export declare const InlineQueryResultVideo: t.Struct<TcombInlineQueryResultVideo>;
export interface TcombInlineQueryResultVideo extends BaseInlineQueryResult {
    type: 'video';
    video_url: string;
    thumb_url: string;
    title: string;
    caption?: string;
    video_width?: number;
    video_height?: number;
    video_duration?: number;
    description?: string;
}
export declare const InlineQueryResultVoice: t.Struct<TcombInlineQueryResultVoice>;
export interface TcombInlineQueryResultVoice extends BaseInlineQueryResult {
    type: 'voice';
    voice_url: string;
    title: string;
    caption?: string;
    voice_duration?: number;
}
export declare const InlineQueryResult: t.Union<TcombInlineQueryResult>;
export declare type TcombInlineQueryResult = TcombInlineQueryResultCachedAudio | TcombInlineQueryResultCachedDocument | TcombInlineQueryResultCachedGif | TcombInlineQueryResultCachedMpeg4Gif | TcombInlineQueryResultCachedPhoto | TcombInlineQueryResultCachedSticker | TcombInlineQueryResultCachedVideo | TcombInlineQueryResultCachedVoice | TcombInlineQueryResultArticle | TcombInlineQueryResultAudio | TcombInlineQueryResultContact | TcombInlineQueryResultGame | TcombInlineQueryResultDocument | TcombInlineQueryResultGif | TcombInlineQueryResultLocation | TcombInlineQueryResultMpeg4Gif | TcombInlineQueryResultPhoto | TcombInlineQueryResultVenue | TcombInlineQueryResultVideo | TcombInlineQueryResultVoice;
