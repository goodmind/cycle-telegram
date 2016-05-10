import t from 'tcomb'
import * as m from './multimedia-types'
import * as k from './keyboard-types'

export const User = t.struct({
  id: t.Number,
  first_name: t.String,
  last_name: t.maybe(t.String),
  username: t.maybe(t.String)
})

export const Chat = t.struct({
  id: t.Number,
  type: t.String,
  title: t.maybe(t.String),
  username: t.maybe(t.String),
  first_name: t.maybe(t.String),
  last_name: t.maybe(t.String)
})

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
  type: t.enums.of(['mention', 'hashtag', 'bot_command', 'url', 'email', 'bold', 'italic', 'code', 'pre', 'text_link']),
  offset: t.Number,
  length: t.Number,
  url: t.maybe(t.String)
})

export const Message = t.declare('Message')

Message.define(t.struct({
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

export const InlineQuery = t.struct({
  id: t.String,
  from: User,
  location: t.maybe(m.Location),
  query: t.String,
  offset: t.String
})

export const ChosenInlineResult = t.struct({
  result_id: t.String,
  from: User,
  location: t.maybe(m.Location),
  inline_message_id: t.maybe(t.String),
  query: t.String
})

export const CallbackQuery = t.struct({
  id: t.String,
  from: User,
  message: t.maybe(Message),
  inline_message_id: t.maybe(t.String),
  data: t.maybe(t.String)
})

export const Update = t.struct({
  update_id: t.Number,
  message: t.maybe(Message),
  inline_query: t.maybe(InlineQuery),
  chosen_inline_result: t.maybe(ChosenInlineResult),
  callback_query: t.maybe(CallbackQuery)
})

export const UpdatesState = t.struct({
  startDate: t.Number,
  offset: t.Number,
  updates: t.list(Update)
})

export const Request = t.struct({
  type: t.enums.of(['sink']),
  method: t.String,
  options: t.Object
})

export const WebhookResponse = t.struct({
  type: t.enums.of(['webhook']),
  update: Update
})
