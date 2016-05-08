import t from 'tcomb'

export const KeyboardButton = t.struct({
  text: t.String,
  request_contact: t.maybe(t.Boolean),
  request_location: t.maybe(t.Boolean)
})

export const ReplyKeyboardMarkup = t.struct({
  keyboard: t.list(t.list(KeyboardButton)),
  resize_keyboard: t.maybe(t.Boolean),
  one_time_keyboard: t.maybe(t.Boolean),
  selective: t.maybe(t.Boolean)
})

export const ReplyKeyboardHide = t.struct({
  hide_keyboard: t.Boolean,
  selective: t.maybe(t.Boolean)
})

export const InlineKeyboardButton = t.struct({
  text: t.String,
  url: t.maybe(t.String),
  callback_data: t.maybe(t.String),
  switch_inline_query: t.maybe(t.String)
})

export const InlineKeyboardMarkup = t.struct({
  inline_keyboard: t.list(t.list(InlineKeyboardButton))
})

export const ForceReply = t.struct({
  force_reply: t.Boolean,
  selective: t.maybe(t.Boolean)
})
