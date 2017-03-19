import * as t from 'tcomb'
import * as k from './keyboard-types'

export const InputTextMessageContent = t.struct<TcombInputTextMessageContent>({
  message_text: t.String,
  parse_mode: t.maybe(t.enums.of(['Markdown', 'HTML'])),
  disable_web_page_preview: t.maybe(t.Boolean)
})
export interface TcombInputTextMessageContent {
  message_text: string
  parse_mode?: 'Markdown' | 'HTML'
  disable_web_page_preview?: boolean
}

export const InputLocationMessageContent = t.struct<TcombInputLocationMessageContent>({
  latitude: t.Number,
  longitude: t.Number
})
export interface TcombInputLocationMessageContent {
  latitude: number
  longitude: number
}

export const InputVenueMessageContent = t.struct<TcombInputVenueMessageContent>({
  latitude: t.Number,
  longitude: t.Number,
  title: t.String,
  address: t.String,
  foursquare_id: t.maybe(t.String)
})
export interface TcombInputVenueMessageContent {
  latitude: number
  longitude: number
  title: string
  address: string
  foursquare_id?: string
}

export const InputContactMessageContent = t.struct<TcombInputContactMessageContent>({
  phone_number: t.String,
  first_name: t.String,
  last_name: t.maybe(t.String)
})
export interface TcombInputContactMessageContent {
  phone_number: string
  first_name: string
  last_name?: string
}

export const InputMessageContent = t.union<TcombInputMessageContent>([
  InputTextMessageContent,
  InputLocationMessageContent,
  InputVenueMessageContent,
  InputContactMessageContent
])
export type TcombInputMessageContent =
  TcombInputTextMessageContent |
  TcombInputLocationMessageContent |
  TcombInputVenueMessageContent |
  TcombInputContactMessageContent

const BaseInlineQuery = <T>(props: any, name: string = 'Unknown') =>
  t.struct<T>(
    Object.assign(
      {},
      {
        type: t.String,
        id: t.String,
        reply_markup: t.maybe(k.InlineKeyboardMarkup),
        input_message_content: t.maybe(InputMessageContent)
      },
      props),
    name)
export interface BaseInlineQueryResult {
  type: string
  id: string
  reply_markup?: k.TcombInlineKeyboardMarkup,
  input_message_content?: TcombInputMessageContent
}

export const InlineQueryResultCachedAudio = BaseInlineQuery<TcombInlineQueryResultCachedAudio>({
  type: t.enums.of(['audio']),
  audio_file_id: t.String,
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultCachedAudio extends BaseInlineQueryResult {
  type: 'audio'
  audio_file_id: string
  caption?: string
}

export const InlineQueryResultCachedDocument = BaseInlineQuery<TcombInlineQueryResultCachedDocument>({
  type: t.enums.of(['document']),
  title: t.String,
  document_file_id: t.String,
  description: t.maybe(t.String),
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultCachedDocument extends BaseInlineQueryResult {
  type: 'document',
  title: string
  document_file_id: string
  description?: string
  caption?: string
}

export const InlineQueryResultCachedGif = BaseInlineQuery<TcombInlineQueryResultCachedGif>({
  type: t.enums.of(['gif']),
  gif_file_id: t.String,
  title: t.maybe(t.String),
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultCachedGif extends BaseInlineQueryResult {
  type: 'gif'
  gif_file_id: string
  title?: string
  caption?: string
}

export const InlineQueryResultCachedMpeg4Gif = BaseInlineQuery<TcombInlineQueryResultCachedMpeg4Gif>({
  type: t.enums.of(['mpeg4_gif']),
  mpeg4_file_id: t.String,
  title: t.maybe(t.String),
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultCachedMpeg4Gif extends BaseInlineQueryResult {
  type: 'mpeg4_gif'
  mpeg4_file_id: string
  title?: string
  caption?: string
}

export const InlineQueryResultCachedPhoto = BaseInlineQuery<TcombInlineQueryResultCachedPhoto>({
  type: t.enums.of(['photo']),
  photo_file_id: t.String,
  title: t.maybe(t.String),
  description: t.maybe(t.String),
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultCachedPhoto extends BaseInlineQueryResult {
  type: 'photo'
  photo_file_id: string
  title?: string
  description?: string
  caption?: string
}

export const InlineQueryResultCachedSticker = BaseInlineQuery<TcombInlineQueryResultCachedSticker>({
  type: t.enums.of(['sticker']),
  sticker_file_id: t.String
})
export interface TcombInlineQueryResultCachedSticker extends BaseInlineQueryResult {
  type: 'sticker'
  sticker_file_id: string
}

export const InlineQueryResultCachedVideo = BaseInlineQuery<TcombInlineQueryResultCachedVideo>({
  type: t.enums.of(['video']),
  video_file_id: t.String,
  title: t.String,
  description: t.maybe(t.String),
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultCachedVideo extends BaseInlineQueryResult {
  type: 'video'
  video_file_id: string
  title: string
  description?: string
  caption?: string
}

export const InlineQueryResultCachedVoice = BaseInlineQuery<TcombInlineQueryResultCachedVoice>({
  type: t.enums.of(['voice']),
  voice_file_id: t.String,
  title: t.String,
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultCachedVoice extends BaseInlineQueryResult {
  type: 'voice'
  voice_file_id: string
  title: string
  caption?: string
}

export const InlineQueryResultArticle = BaseInlineQuery<TcombInlineQueryResultArticle>({
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
export interface TcombInlineQueryResultArticle extends BaseInlineQueryResult {
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

export const InlineQueryResultAudio = BaseInlineQuery<TcombInlineQueryResultAudio>({
  type: t.enums.of(['audio']),
  audio_url: t.String,
  title: t.String,
  performer: t.maybe(t.String),
  caption: t.maybe(t.String),
  audio_duration: t.maybe(t.Number)
})
export interface TcombInlineQueryResultAudio extends BaseInlineQueryResult {
  type: 'audio'
  audio_url: string,
  title: string
  performer?: string
  caption?: string
  audio_duration?: number
}

export const InlineQueryResultContact = BaseInlineQuery<TcombInlineQueryResultContact>({
  type: t.enums.of(['contact']),
  phone_number: t.String,
  first_name: t.String,
  last_name: t.maybe(t.String),
  thumb_url: t.maybe(t.String),
  thumb_width: t.maybe(t.Number),
  thumb_height: t.maybe(t.Number)
})
export interface TcombInlineQueryResultContact extends BaseInlineQueryResult {
  type: 'contact'
  phone_number: string
  first_name: string
  last_name?: string
  thumb_url?: string
  thumb_width?: number
  thumb_height?: number
}

export const InlineQueryResultGame = BaseInlineQuery<TcombInlineQueryResultGame>({
  type: t.enums.of(['game']),
  game_short_name: t.String
})
export interface TcombInlineQueryResultGame extends BaseInlineQueryResult {
  type: 'game'
  game_short_name: string
}

export const InlineQueryResultDocument = BaseInlineQuery<TcombInlineQueryResultDocument>({
  type: t.enums.of(['document']),
  title: t.String,
  caption: t.maybe(t.String),
  document_url: t.String,
  description: t.maybe(t.String),
  thumb_url: t.maybe(t.String),
  thumb_width: t.maybe(t.Number),
  thumb_height: t.maybe(t.Number)
})
export interface TcombInlineQueryResultDocument extends BaseInlineQueryResult {
  type: 'document'
  title: string
  caption?: string
  document_url: string
  description?: string
  thumb_url?: string
  thumb_width?: number
  thumb_height?: number
}

export const InlineQueryResultGif = BaseInlineQuery<TcombInlineQueryResultGif>({
  type: t.enums.of(['gif']),
  gif_url: t.String,
  gif_width: t.maybe(t.Number),
  gif_height: t.maybe(t.Number),
  thumb_url: t.String,
  title: t.maybe(t.String),
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultGif extends BaseInlineQueryResult {
  type: 'gif'
  gif_url: string
  gif_width?: number
  gif_height?: number
  thumb_url: string
  title?: string
  caption?: string
}

export const InlineQueryResultLocation = BaseInlineQuery<TcombInlineQueryResultLocation>({
  type: t.enums.of(['location']),
  latitude: t.Number,
  longitude: t.Number,
  title: t.String,
  thumb_url: t.maybe(t.String),
  thumb_width: t.maybe(t.Number),
  thumb_height: t.maybe(t.Number)
})
export interface TcombInlineQueryResultLocation extends BaseInlineQueryResult {
  type: 'location'
  latitude: number
  longitude: number
  title: string
  thumb_url?: string
  thumb_width?: number
  thumb_height?: number
}

export const InlineQueryResultMpeg4Gif = BaseInlineQuery<TcombInlineQueryResultMpeg4Gif>({
  type: t.enums.of(['mpeg4_gif']),
  mpeg4_url: t.String,
  mpeg4_width: t.Number,
  mpeg4_height: t.Number,
  thumb_url: t.String,
  title: t.maybe(t.String),
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultMpeg4Gif extends BaseInlineQueryResult {
  type: 'mpeg4_gif'
  mpeg4_url: string
  mpeg4_width?: number
  mpeg4_height?: number
  thumb_url: string
  title?: string
  caption?: string
}

export const InlineQueryResultPhoto = BaseInlineQuery<TcombInlineQueryResultPhoto>({
  type: t.enums.of(['photo']),
  photo_url: t.String,
  thumb_url: t.String,
  photo_width: t.maybe(t.Number),
  photo_height: t.maybe(t.Number),
  title: t.maybe(t.String),
  description: t.maybe(t.String),
  caption: t.maybe(t.String)
})
export interface TcombInlineQueryResultPhoto extends BaseInlineQueryResult {
  type: 'photo'
  photo_url: string
  thumb_url: string
  photo_width?: number
  photo_height?: number
  title?: string
  description?: string
  caption?: string
}

export const InlineQueryResultVenue = BaseInlineQuery<TcombInlineQueryResultVenue>({
  type: t.enums.of(['venue']),
  latitude: t.Number,
  longitude: t.Number,
  title: t.String,
  address: t.String,
  foursquare_id: t.maybe(t.String),
  thumb_url: t.maybe(t.String),
  thumb_width: t.maybe(t.Number),
  thumb_height: t.maybe(t.Number)
})
export interface TcombInlineQueryResultVenue extends BaseInlineQueryResult {
  type: 'venue'
  latitude: number
  longitude: number
  title: string
  address: string
  foursquare_id?: string
  thumb_url?: string
  thumb_width?: number
  thumb_height?: number
}

export const InlineQueryResultVideo = BaseInlineQuery<TcombInlineQueryResultVideo>({
  type: t.enums.of(['video']),
  video_url: t.String,
  thumb_url: t.String,
  title: t.String,
  caption: t.maybe(t.String),
  video_width: t.maybe(t.Number),
  video_height: t.maybe(t.Number),
  video_duration: t.maybe(t.Number),
  description: t.maybe(t.String)
})
export interface TcombInlineQueryResultVideo extends BaseInlineQueryResult {
  type: 'video'
  video_url: string
  thumb_url: string
  title: string
  caption?: string
  video_width?: number
  video_height?: number
  video_duration?: number
  description?: string
}

export const InlineQueryResultVoice = BaseInlineQuery<TcombInlineQueryResultVoice>({
  type: t.enums.of(['voice']),
  voice_url: t.String,
  title: t.String,
  caption: t.maybe(t.String),
  voice_duration: t.maybe(t.Number)
})
export interface TcombInlineQueryResultVoice extends BaseInlineQueryResult {
  type: 'voice'
  voice_url: string
  title: string
  caption?: string
  voice_duration?: number
}

export const InlineQueryResult = t.union<TcombInlineQueryResult>([
  InlineQueryResultCachedAudio,
  InlineQueryResultCachedDocument,
  InlineQueryResultCachedGif,
  InlineQueryResultCachedMpeg4Gif,
  InlineQueryResultCachedPhoto,
  InlineQueryResultCachedSticker,
  InlineQueryResultCachedVideo,
  InlineQueryResultCachedVoice,
  InlineQueryResultArticle,
  InlineQueryResultAudio,
  InlineQueryResultContact,
  InlineQueryResultGame,
  InlineQueryResultDocument,
  InlineQueryResultGif,
  InlineQueryResultLocation,
  InlineQueryResultMpeg4Gif,
  InlineQueryResultPhoto,
  InlineQueryResultVenue,
  InlineQueryResultVideo,
  InlineQueryResultVoice
])
export type TcombInlineQueryResult =
  TcombInlineQueryResultCachedAudio |
  TcombInlineQueryResultCachedDocument |
  TcombInlineQueryResultCachedGif |
  TcombInlineQueryResultCachedMpeg4Gif |
  TcombInlineQueryResultCachedPhoto |
  TcombInlineQueryResultCachedSticker |
  TcombInlineQueryResultCachedVideo |
  TcombInlineQueryResultCachedVoice |
  TcombInlineQueryResultArticle |
  TcombInlineQueryResultAudio |
  TcombInlineQueryResultContact |
  TcombInlineQueryResultGame |
  TcombInlineQueryResultDocument |
  TcombInlineQueryResultGif |
  TcombInlineQueryResultLocation |
  TcombInlineQueryResultMpeg4Gif |
  TcombInlineQueryResultPhoto |
  TcombInlineQueryResultVenue |
  TcombInlineQueryResultVideo |
  TcombInlineQueryResultVoice
