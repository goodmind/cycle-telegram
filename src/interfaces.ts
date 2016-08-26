import { Observable, IDisposable } from 'rx'
import { TcombWebhookResponse, TcombRequest } from './runtime-types/types'

export type Token = string;

export interface Update {
  update_id: number,
  message?: any,
  inline_query?: any,
  chosen_inline_result?: any,
  callback_query?: any
}

export interface TelegramDriverState {
  startDate: number
  offset: number
  updates: Update[]
}

export interface TelegramDriverOptions {
  webhook?: boolean
  startDate?: number
}

export type EventsFn = (eventName: string) => Observable<Update>;

export interface TelegramDriverExecution extends IDisposable {
  token: Token
  updates: Observable<TelegramDriverState>
  responses: Observable<TelegramAPIResponseResult>
  events: EventsFn
}

export type TelegramDriverSink = TcombRequest | TcombWebhookResponse

export interface TelegramDriverSources {
  message: Observable<Update>
  inlineQuery: Observable<Update>
  chosenInlineResult: Observable<Update>
  callbackQuery: Observable<Update>
}

export interface TelegramAPIRequest {
  token: Token
  method: string
  query: any
  httpMethod?: string
}

export interface TelegramAPIResponseResult {}

export interface TelegramAPIError {
  ok: boolean
  description: string
  error_code: number
}

export interface TelegramAPIResponse {
  ok: boolean
  description?: string
  result: TelegramAPIResponseResult
}
