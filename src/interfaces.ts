import { Observable } from 'rxjs'
import { TcombWebhookResponse, TcombRequest, TcombUpdate, TcombUpdatesState } from './runtime-types/types'
import * as t from 'tcomb'

export type Token = string
export type GenericStream<T> = any
export type DriverSink = TcombRequest | TcombWebhookResponse
export type PartialUpdate = Partial<TcombUpdate>
export type EventNames =
  | 'message'
  | 'channel_post'
  | 'edited_message'
  | 'edited_channel_post'
  | 'inline_query'
  | 'chosen_inline_result'
  | 'callback_query'

export interface DriverOptions {
  webhook?: boolean
  startDate?: number,
  skipUpdates?: boolean
}

export interface DriverSources {
  message: Observable<TcombUpdate>
  channelPost: Observable<TcombUpdate>
  editedMessage: Observable<TcombUpdate>
  editedChannelPost: Observable<TcombUpdate>
  inlineQuery: Observable<TcombUpdate>
  chosenInlineResult: Observable<TcombUpdate>
  callbackQuery: Observable<TcombUpdate>
}

export interface DriverExecution {
  token: Token
  updates: GenericStream<TcombUpdatesState>
  responses: GenericStream<any>
  selectResponses<T, R> (query: Partial<{ responseType: t.Type<R>, method: string }>): GenericStream<T>
  events (eventName: string): GenericStream<TcombUpdate>
  dispose (): void
}

export namespace TelegramAPI {
  export interface Request {
    token: Token
    method: string
    query: any
    httpMethod?: string
    returnType?: t.Type<any>
  }

  export interface ResponseParameters {
    migrate_to_chat_id: string
    retry_after: number
  }

  export interface Error {
    ok: boolean
    description: string
    error_code: number
    parameters?: ResponseParameters
  }

  export interface ResponseResult {}

  export interface Response {
    ok: boolean
    description?: string
    result: ResponseResult
  }
}
