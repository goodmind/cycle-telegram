import * as t from 'tcomb'
import * as m from './multimedia-types'
import * as k from './keyboard-types'

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

export const Chat = t.struct<TcombChat>({
  id: t.Number,
  type: t.enums.of(['private', 'group', 'supergroup', 'channel']),
  title: t.maybe(t.String),
  username: t.maybe(t.String),
  first_name: t.maybe(t.String),
  last_name: t.maybe(t.String)
})

export interface TcombChat {
  id: number
  type: 'private' | 'group' | 'supergroup' | 'channel',
  title?: string
  username?: string
  first_name?: string
  last_name?: string
}

export const InputMessageContent = t.struct({
  message_text: t.String,
  parse_mode: t.maybe(t.String),
  disable_web_page_preview: t.maybe(t.Boolean)
})

export const InlineQueryResult = t.struct({

})

export const InlineQueryResultArticle = InlineQueryResult.extend({
  type: t.String,
  id: t.String,
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

export const MessageEntity = t.struct({
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
  url: t.maybe(t.String)
})

export const Message = t.declare('Message')

Message.define(t.struct<TcombMessage>({
  message_id: t.Number,
  from: t.maybe(User),
  date: t.Number,
  chat: Chat,
  forward_from: t.maybe(User),
  forward_date: t.maybe(t.Number),
  reply_to_message: t.maybe(Message),
  text: t.maybe(t.String),
  entities: t.maybe(t.list(MessageEntity)),
  audio: t.maybe(m.Audio),
  document: t.maybe(m.Document),
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
  chat: TcombChat
  forward_from?: any
  forward_date?: number
  reply_to_message?: TcombMessage
  text?: string
  entities?: any[]
  audio?: any
  document?: any
  photo?: any[]
  sticker?: any
  video?: any
  voice?: any
  caption?: string
  contact?: any
  location?: any
  new_chat_member?: TcombUser
  left_chat_member?: TcombUser
  new_chat_title?: string
  new_chat_photo?: any[]
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
  location?: any
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
  location?: any
  inline_message_id?: string
  query: string
}

export const CallbackQuery = t.struct<TcombCallbackQuery>({
  id: t.String,
  from: User,
  message: t.maybe(Message),
  inline_message_id: t.maybe(t.String),
  data: t.maybe(t.String)
})

export interface TcombCallbackQuery {
  id: string
  from: TcombUser
  message?: TcombMessage
  inline_message_id?: string
  data?: string
}

export const Update = t.struct<TcombUpdate>({
  update_id: t.Number,
  message: t.maybe(Message),
  inline_query: t.maybe(InlineQuery),
  chosen_inline_result: t.maybe(ChosenInlineResult),
  callback_query: t.maybe(CallbackQuery)
})

export interface TcombUpdate {
  update_id: number,
  message?: TcombMessage,
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

export const Request = t.struct<TcombRequest>({
  type: t.enums.of(['sink']),
  multipart: t.maybe(t.Boolean),
  method: t.String,
  options: t.Object
})

export interface TcombRequest {
  type: 'sink',
  multipart?: boolean,
  method: string,
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
