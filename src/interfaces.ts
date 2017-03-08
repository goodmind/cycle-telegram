import { Observable, IDisposable } from 'rx'
import { TcombWebhookResponse, TcombRequest, TcombUpdate, TcombUpdatesState } from './runtime-types/types'
import * as t from 'tcomb'

export type Token = string
export type GenericStream<T> = any
export type DriverSink = TcombRequest | TcombWebhookResponse

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

export interface DriverExecution extends IDisposable {
  token: Token
  updates: GenericStream<TcombUpdatesState>
  responses: GenericStream<any>
  events (eventName: string): GenericStream<TcombUpdate>
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
