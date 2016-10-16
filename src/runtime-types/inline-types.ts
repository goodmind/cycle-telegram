import * as t from 'tcomb'
import * as k from './keyboard-types'

export const InputMessageContent = t.struct<TcombInputMessageContent>({
  message_text: t.String,
  parse_mode: t.maybe(t.String),
  disable_web_page_preview: t.maybe(t.Boolean)
})
export interface TcombInputMessageContent {
  message_text: string
  parse_mode?: string
  disable_web_page_preview?: boolean
}

export const InlineQueryResult = t.struct<TcombInlineQueryResult>({
  type: t.String,
  id: t.String,
  reply_markup: t.maybe(k.InlineKeyboardMarkup),
  input_message_content: t.maybe(InputMessageContent)
})
export interface TcombInlineQueryResult {
  type: string
  id: string
  reply_markup?: k.TcombInlineKeyboardMarkup,
  input_message_content?: TcombInputMessageContent
}

export const InlineQueryResultCachedAudio = InlineQueryResult.extend<TcombInlineQueryResultCachedAudio>({
  type: t.enums.of(['audio']),
  audio_file_id: t.String,
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultCachedAudio extends TcombInlineQueryResult {
  type: 'audio'
  audio_file_id: string
  caption?: string
}

export const InlineQueryResultCachedDocument = InlineQueryResult.extend<TcombInlineQueryResultCachedDocument>({
  type: t.enums.of(['document']),
  title: t.String,
  document_file_id: t.String,
  description: t.maybe(t.String),
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultCachedDocument extends TcombInlineQueryResult {
  type: 'document',
  title: string
  document_file_id: string
  description?: string
  caption?: string
}

export const InlineQueryResultCachedGif = InlineQueryResult.extend<TcombInlineQueryResultCachedGif>({})
export interface TcombInlineQueryResultCachedGif extends TcombInlineQueryResult {}

export const InlineQueryResultCachedMpeg4Gif = InlineQueryResult.extend<TcombInlineQueryResultCachedMpeg4Gif>({})
export interface TcombInlineQueryResultCachedMpeg4Gif extends TcombInlineQueryResult {}

export const InlineQueryResultCachedPhoto = InlineQueryResult.extend<TcombInlineQueryResultCachedPhoto>({})
export interface TcombInlineQueryResultCachedPhoto extends TcombInlineQueryResult {}

export const InlineQueryResultCachedSticker = InlineQueryResult.extend<TcombInlineQueryResultCachedSticker>({})
export interface TcombInlineQueryResultCachedSticker extends TcombInlineQueryResult {}

export const InlineQueryResultCachedVideo = InlineQueryResult.extend<TcombInlineQueryResultCachedVideo>({})
export interface TcombInlineQueryResultCachedVideo extends TcombInlineQueryResult {}

export const InlineQueryResultCachedVoice = InlineQueryResult.extend<TcombInlineQueryResultCachedVoice>({})
export interface TcombInlineQueryResultCachedVoice extends TcombInlineQueryResult {}

export const InlineQueryResultArticle = InlineQueryResult.extend<TcombInlineQueryResultArticle>({
  type: t.enums.of(['article']),
  title: t.String,
  input_message_content: InputMessageContent,
  reply_markup: t.maybe(k.InlineKeyboardMarkup),
  url: t.maybe(t.String),
  hide_url: t.maybe(t.Boolean),
  description: t.maybe(t.String),
  thumb_url: t.maybe(t.String),
  thumb_width: t.maybe(t.Number),
  thumb_height: t.maybe(t.Number)
})
export interface TcombInlineQueryResultArticle extends TcombInlineQueryResult {
  type: 'article'
  title: string
  input_message_content: TcombInputMessageContent
  reply_markup?: k.TcombInlineKeyboardMarkup
  url?: string
  hide_url?: boolean
  description?: string
  thumb_url?: string
  thumb_width?: number
  thumb_height?: number
}

export const InlineQueryResultAudio = InlineQueryResult.extend<TcombInlineQueryResultAudio>({})
export interface TcombInlineQueryResultAudio extends TcombInlineQueryResult {}

export const InlineQueryResultContact = InlineQueryResult.extend<TcombInlineQueryResultContact>({})
export interface TcombInlineQueryResultContact extends TcombInlineQueryResult {}

export const InlineQueryResultGame = InlineQueryResult.extend<TcombInlineQueryResultGame>({})
export interface TcombInlineQueryResultGame extends TcombInlineQueryResult {}

export const InlineQueryResultDocument = InlineQueryResult.extend<TcombInlineQueryResultDocument>({})
export interface TcombInlineQueryResultDocument extends TcombInlineQueryResult {}

export const InlineQueryResultGif = InlineQueryResult.extend<TcombInlineQueryResultGif>({})
export interface TcombInlineQueryResultGif extends TcombInlineQueryResult {}

export const InlineQueryResultLocation = InlineQueryResult.extend<TcombInlineQueryResultLocation>({})
export interface TcombInlineQueryResultLocation extends TcombInlineQueryResult {}

export const InlineQueryResultMpeg4Gif = InlineQueryResult.extend<TcombInlineQueryResultMpeg4Gif>({})
export interface TcombInlineQueryResultMpeg4Gif extends TcombInlineQueryResult {}

export const InlineQueryResultPhoto = InlineQueryResult.extend<TcombInlineQueryResultPhoto>({})
export interface TcombInlineQueryResultPhoto extends TcombInlineQueryResult {}

export const InlineQueryResultVenue = InlineQueryResult.extend<TcombInlineQueryResultVenue>({})
export interface TcombInlineQueryResultVenue extends TcombInlineQueryResult {}

export const InlineQueryResultVideo = InlineQueryResult.extend<TcombInlineQueryResultVideo>({})
export interface TcombInlineQueryResultVideo extends TcombInlineQueryResult {}

export const InlineQueryResultVoice = InlineQueryResult.extend<TcombInlineQueryResultVoice>({})
export interface TcombInlineQueryResultVoice extends TcombInlineQueryResult {}
