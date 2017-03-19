import * as t from 'tcomb'
import { TcombCallbackGame, CallbackGame } from './types'

export const KeyboardButton = t.struct<TcombKeyboardButton>({
  text: t.String,
  request_contact: t.maybe(t.Boolean),
  request_location: t.maybe(t.Boolean)
})
export interface TcombKeyboardButton {
  text: string
  request_contact?: boolean
  request_location?: boolean
}

export const ReplyKeyboardMarkup = t.struct<TcombReplyKeyboardMarkup>({
  keyboard: t.list(t.list(KeyboardButton)),
  resize_keyboard: t.maybe(t.Boolean),
  one_time_keyboard: t.maybe(t.Boolean),
  selective: t.maybe(t.Boolean)
})
export interface TcombReplyKeyboardMarkup {
  keyboard: TcombKeyboardButton[][]
  resize_keyboard?: boolean
  one_time_keyboard?: boolean
  selective?: boolean
}

export const ReplyKeyboardRemove = t.struct<TcombReplyKeyboardRemove>({
  hide_keyboard: t.Boolean,
  selective: t.maybe(t.Boolean)
})
export interface TcombReplyKeyboardRemove {
  hide_keyboard: boolean
  selective?: boolean
}

export const InlineKeyboardButton = t.struct<TcombInlineKeyboardButton>({
  text: t.String,
  url: t.maybe(t.String),
  callback_data: t.maybe(t.String),
  callback_game: t.maybe(CallbackGame),
  switch_inline_query: t.maybe(t.String),
  switch_inline_query_current_chat: t.maybe(t.String)
})
export interface TcombInlineKeyboardButton {
  text: string
  url?: string
  callback_data?: string
  callback_game?: TcombCallbackGame
  switch_inline_query?: string
  switch_inline_query_current_chat?: string
}

export const InlineKeyboardMarkup = t.struct<TcombInlineKeyboardMarkup>({
  inline_keyboard: t.list(t.list(InlineKeyboardButton))
})
export interface TcombInlineKeyboardMarkup {
  inline_keyboard: TcombInlineKeyboardButton[][]
}

export const ForceReply = t.struct<TcombForceReply>({
  force_reply: t.Boolean,
  selective: t.maybe(t.Boolean)
})
export interface TcombForceReply {
  force_reply: boolean
  selective?: boolean
}
