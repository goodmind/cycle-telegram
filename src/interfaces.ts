import { Observable } from 'rxjs'
import { TcombWebhookResponse, TcombRequest, TcombUpdate, TcombUpdatesState } from './runtime-types/types'

export type Token = string
export type GenericStream<T> = any
export type DriverSink = TcombRequest | TcombWebhookResponse
export type EventNames = 'message' | 'inline_query' | 'chosen_inline_result' | 'callback_query'

export interface DriverOptions {
  webhook?: boolean
  startDate?: number,
  skipUpdates?: boolean
}

export interface DriverSources {
  message: Observable<TcombUpdate>
  inlineQuery: Observable<TcombUpdate>
  chosenInlineResult: Observable<TcombUpdate>
  callbackQuery: Observable<TcombUpdate>
}

export interface DriverExecution {
  token: Token
  updates: GenericStream<TcombUpdatesState>
  responses: GenericStream<any>
  events (eventName: string): GenericStream<TcombUpdate>
  dispose (): void
}

export interface TelegramAPIRequest {
  token: Token
  method: string
  query: any
  httpMethod?: string
}

export interface TelegramAPIError {
  ok: boolean
  description: string
  error_code: number
}

export interface TelegramAPIResponseResult {}

export interface TelegramAPIResponse {
  ok: boolean
  description?: string
  result: TelegramAPIResponseResult
}
