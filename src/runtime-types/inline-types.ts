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

const BaseInlineQuery = function <T>(props: any, name: string = 'Unknown') {
  return t.struct<T>(
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
}
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

export const InlineQueryResultCachedGif = BaseInlineQuery<TcombInlineQueryResultCachedGif>({})
export interface TcombInlineQueryResultCachedGif extends BaseInlineQueryResult {}

export const InlineQueryResultCachedMpeg4Gif = BaseInlineQuery<TcombInlineQueryResultCachedMpeg4Gif>({})
export interface TcombInlineQueryResultCachedMpeg4Gif extends BaseInlineQueryResult {}

export const InlineQueryResultCachedPhoto = BaseInlineQuery<TcombInlineQueryResultCachedPhoto>({})
export interface TcombInlineQueryResultCachedPhoto extends BaseInlineQueryResult {}

export const InlineQueryResultCachedSticker = BaseInlineQuery<TcombInlineQueryResultCachedSticker>({})
export interface TcombInlineQueryResultCachedSticker extends BaseInlineQueryResult {}

export const InlineQueryResultCachedVideo = BaseInlineQuery<TcombInlineQueryResultCachedVideo>({})
export interface TcombInlineQueryResultCachedVideo extends BaseInlineQueryResult {}

export const InlineQueryResultCachedVoice = BaseInlineQuery<TcombInlineQueryResultCachedVoice>({})
export interface TcombInlineQueryResultCachedVoice extends BaseInlineQueryResult {}

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

export const InlineQueryResultAudio = BaseInlineQuery<TcombInlineQueryResultAudio>({})
export interface TcombInlineQueryResultAudio extends BaseInlineQueryResult {}

export const InlineQueryResultContact = BaseInlineQuery<TcombInlineQueryResultContact>({})
export interface TcombInlineQueryResultContact extends BaseInlineQueryResult {}

export const InlineQueryResultGame = BaseInlineQuery<TcombInlineQueryResultGame>({
  type: t.enums.of(['game']),
  game_short_name: t.String
})
export interface TcombInlineQueryResultGame extends BaseInlineQueryResult {
  type: 'game'
  game_short_name: string
}

export const InlineQueryResultDocument = BaseInlineQuery<TcombInlineQueryResultDocument>({})
export interface TcombInlineQueryResultDocument extends BaseInlineQueryResult {}

export const InlineQueryResultGif = BaseInlineQuery<TcombInlineQueryResultGif>({})
export interface TcombInlineQueryResultGif extends BaseInlineQueryResult {}

export const InlineQueryResultLocation = BaseInlineQuery<TcombInlineQueryResultLocation>({})
export interface TcombInlineQueryResultLocation extends BaseInlineQueryResult {}

export const InlineQueryResultMpeg4Gif = BaseInlineQuery<TcombInlineQueryResultMpeg4Gif>({})
export interface TcombInlineQueryResultMpeg4Gif extends BaseInlineQueryResult {}

export const InlineQueryResultPhoto = BaseInlineQuery<TcombInlineQueryResultPhoto>({})
export interface TcombInlineQueryResultPhoto extends BaseInlineQueryResult {}

export const InlineQueryResultVenue = BaseInlineQuery<TcombInlineQueryResultVenue>({})
export interface TcombInlineQueryResultVenue extends BaseInlineQueryResult {}

export const InlineQueryResultVideo = BaseInlineQuery<TcombInlineQueryResultVideo>({})
export interface TcombInlineQueryResultVideo extends BaseInlineQueryResult {}

export const InlineQueryResultVoice = BaseInlineQuery<TcombInlineQueryResultVoice>({})
export interface TcombInlineQueryResultVoice extends BaseInlineQueryResult {}

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
