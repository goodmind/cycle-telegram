import t from 'tcomb'

export const ReplyKeyboardMarkup = t.struct({})

export const ReplyKeyboardHide = t.struct({})

export const KeyboardButton = t.struct({})

export const InlineKeyboardButton = t.struct({
  text: t.String,
  url: t.maybe(t.String),
  callback_data: t.maybe(t.String),
  switch_inline_query: t.maybe(t.String)
})

export const InlineKeyboardMarkup = t.struct({
  inline_keyboard: t.list(t.list(InlineKeyboardButton))
})

export const CallbackQuery = t.struct({})

export const ForceReply = t.struct({})
