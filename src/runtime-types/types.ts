import * as t from 'tcomb'
import * as m from './multimedia-types'

export const InputFile = t.Any
export interface TcombInputFile {}

export const User = t.struct<TcombUser>({
  id: t.Number,
  first_name: t.String,
  last_name: t.maybe(t.String),
  username: t.maybe(t.String)
})
export interface TcombUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
}

export const ChatMember = t.struct<TcombChatMember>({
  user: User,
  status: t.enums.of([
    'creator',
    'administrator',
    'member',
    'left',
    'kicked'
  ])
})
export interface TcombChatMember {
  user: TcombUser,
  status: 'creator' |
          'administrator' |
          'member' |
          'left' |
          'kicked'
}

export const Chat = t.struct<TcombChat>({
  id: t.Number,
  type: t.enums.of(['private', 'group', 'supergroup', 'channel']),
  title: t.maybe(t.String),
  username: t.maybe(t.String),
  first_name: t.maybe(t.String),
  last_name: t.maybe(t.String),
  all_members_are_administrators: t.maybe(t.Boolean)
})
export interface TcombChat {
  id: number
  type: 'private' | 'group' | 'supergroup' | 'channel',
  title?: string
  username?: string
  first_name?: string
  last_name?: string,
  all_members_are_administrators: boolean
}

export const MessageEntity = t.struct<TcombMessageEntity>({
  type: t.enums.of([
    'mention',
    'hashtag',
    'bot_command',
    'url',
    'email',
    'bold',
    'italic',
    'code',
    'pre',
    'text_link',
    'text_mention'
  ]),
  offset: t.Number,
  length: t.Number,
  url: t.maybe(t.String),
  user: t.maybe(User)
})
export interface TcombMessageEntity {
  type: 'mention' |
        'hashtag' |
        'bot_command' |
        'url' |
        'email' |
        'bold' |
        'italic' |
        'code' |
        'pre' |
        'text_link' |
        'text_mention',
  offset: number
  length: number
  url?: string
  user?: TcombUser
}

export const GameHighScore = t.struct<TcombGameHighScore>({
  position: t.Number,
  user: User,
  score: t.Number
})
export interface TcombGameHighScore {
  position: number
  user: TcombUser
  score: number
}

export const Game = t.struct<TcombGame>({
  title: t.String,
  description: t.String,
  photo: t.list(m.PhotoSize),
  text: t.maybe(t.String),
  text_entities: t.maybe(t.list(MessageEntity)),
  animation: t.maybe(m.Animation)
})
export interface TcombGame {
  title: string
  description: string
  photo: m.TcombPhotoSize[],
  text?: string
  text_entities?: TcombMessageEntity[],
  animation?: m.TcombAnimation
}

export const Message = t.declare<TcombMessage>('Message')
Message.define(t.struct({
  message_id: t.Number,
  from: t.maybe(User),
  edit_date: t.maybe(t.Number),
  date: t.Number,
  chat: Chat,
  forward_from: t.maybe(User),
  forward_from_chat: t.maybe(Chat),
  forward_date: t.maybe(t.Number),
  reply_to_message: t.maybe(Message),
  text: t.maybe(t.String),
  entities: t.maybe(t.list(MessageEntity)),
  audio: t.maybe(m.Audio),
  document: t.maybe(m.Document),
  game: t.maybe(Game),
  photo: t.maybe(t.list(m.PhotoSize)),
  sticker: t.maybe(m.Sticker),
  video: t.maybe(m.Video),
  voice: t.maybe(m.Voice),
  caption: t.maybe(t.String),
  contact: t.maybe(m.Contact),
  location: t.maybe(m.Location),
  venue: t.maybe(m.Venue),
  new_chat_member: t.maybe(User),
  left_chat_member: t.maybe(User),
  new_chat_title: t.maybe(t.String),
  new_chat_photo: t.maybe(t.list(m.PhotoSize)),
  delete_chat_photo: t.maybe(t.Boolean),
  group_chat_created: t.maybe(t.Boolean),
  supergroup_chat_created: t.maybe(t.Boolean),
  channel_chat_created: t.maybe(t.Boolean),
  migrate_to_chat_id: t.maybe(t.Number),
  migrate_from_chat_id: t.maybe(t.Number),
  pinned_message: t.maybe(Message)
}))
export interface TcombMessage {
  message_id: number
  from?: TcombUser
  date: number
  edit_date?: number
  chat: TcombChat
  forward_from?: TcombUser
  forward_from_chat?: TcombChat
  forward_date?: number
  reply_to_message?: TcombMessage
  text?: string
  entities?: TcombMessageEntity[]
  audio?: m.TcombAudio
  document?: m.TcombDocument
  game?: TcombGame
  photo?: m.TcombPhotoSize[]
  sticker?: m.TcombSticker
  video?: m.TcombVideo
  voice?: m.TcombVoice
  caption?: string
  contact?: m.TcombContact
  location?: m.TcombLocation
  venue?: m.TcombVenue
  new_chat_member?: TcombUser
  left_chat_member?: TcombUser
  new_chat_title?: string
  new_chat_photo?: m.TcombPhotoSize[]
  delete_chat_photo?: boolean
  group_chat_created?: boolean
  supergroup_chat_created?: boolean
  channel_chat_created?: boolean
  migrate_to_chat_id?: number
  migrate_from_chat_id?: number
  pinned_message?: TcombMessage
}

export const InlineQuery = t.struct<TcombInlineQuery>({
  id: t.String,
  from: User,
  location: t.maybe(m.Location),
  query: t.String,
  offset: t.String
})
export interface TcombInlineQuery {
  id: string
  from: TcombUser
  location?: m.TcombLocation
  query: string
  offset: string
}

export const ChosenInlineResult = t.struct<TcombChosenInlineResult>({
  result_id: t.String,
  from: User,
  location: t.maybe(m.Location),
  inline_message_id: t.maybe(t.String),
  query: t.String
})
export interface TcombChosenInlineResult {
  result_id: string
  from: TcombUser
  location?: m.TcombLocation
  inline_message_id?: string
  query: string
}

export const CallbackGame = t.struct<TcombCallbackGame>({})
export interface TcombCallbackGame {}

export const CallbackQuery = t.struct<TcombCallbackQuery>({
  id: t.String,
  from: User,
  message: t.maybe(Message),
  inline_message_id: t.maybe(t.String),
  chat_instance: t.String,
  data: t.maybe(t.String),
  game_short_name: t.maybe(t.String)
})
export interface TcombCallbackQuery {
  id: string
  from: TcombUser
  message?: TcombMessage
  inline_message_id?: string
  chat_instance: string
  data?: string
  game_short_name?: string
}

export const Update = t.struct<TcombUpdate>({
  update_id: t.Number,
  message: t.maybe(Message),
  edited_message: t.maybe(Message),
  inline_query: t.maybe(InlineQuery),
  chosen_inline_result: t.maybe(ChosenInlineResult),
  callback_query: t.maybe(CallbackQuery)
})
export interface TcombUpdate {
  update_id: number,
  message?: TcombMessage,
  edited_message?: TcombMessage,
  inline_query?: TcombInlineQuery,
  chosen_inline_result?: TcombChosenInlineResult,
  callback_query?: TcombCallbackQuery
}

export const UpdateInlineQuery =
  t.refinement<TcombUpdateInlineQuery>(
    Update,
    (u) => !!u.inline_query,
    'UpdateInlineQuery')
export interface TcombUpdateInlineQuery {
  update_id: number,
  inline_query: TcombInlineQuery
}

export const UpdateMessage =
  t.refinement<TcombUpdateMessage>(
    Update,
    (u) => !!u.message,
    'UpdateMessage')
export interface TcombUpdateMessage {
  update_id: number,
  message: TcombMessage
}

export const UpdateChosenInlineResult =
  t.refinement<TcombUpdateChosenInlineResult>(
    Update,
    (u) => !!u.chosen_inline_result,
    'UpdateChosenInlineResult')
export interface TcombUpdateChosenInlineResult {
  update_id: number,
  chosen_inline_result: TcombChosenInlineResult
}

export const UpdateCallbackQuery =
  t.refinement<TcombUpdateCallbackQuery>(
    Update,
    (u) => !!u.callback_query,
    'UpdateCallbackQuery')
export interface TcombUpdateCallbackQuery {
  update_id: number,
  callback_query: TcombCallbackQuery
}

export const UpdatesState = t.struct<TcombUpdatesState>({
  startDate: t.Number,
  offset: t.Number,
  updates: t.list(Update)
})
export interface TcombUpdatesState {
  startDate: number
  offset: number
  updates: TcombUpdate[]
}

export const WebhookInfo = t.struct<TcombWebhookInfo>({
  url: t.String,
  has_custom_certificate: t.Boolean,
  pending_update_count: t.Number,
  last_error_date: t.maybe(t.Number),
  last_error_message: t.maybe(t.String)
})
export interface TcombWebhookInfo {
  url: string
  has_custom_certificate: boolean
  pending_update_count: number
  last_error_date?: number
  last_error_message?: string
}

export const Request = t.struct<TcombRequest>({
  type: t.enums.of(['sink']),
  multipart: t.maybe(t.Boolean),
  method: t.String,
  returnType: t.maybe(t.String),
  options: t.Object
})
export interface TcombRequest {
  type: 'sink',
  multipart?: boolean,
  method: string,
  returnType?: string
  options: any
}

export const WebhookResponse = t.struct<TcombWebhookResponse>({
  type: t.enums.of(['webhook']),
  update: Update
})
export interface TcombWebhookResponse {
  type: 'webhook',
  update: TcombUpdate
}
