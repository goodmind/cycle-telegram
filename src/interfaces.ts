import { Observable, IDisposable } from 'rx'

export type Token = string;

export interface Update {
  update_id: number,
  message?: any,
  inline_query?: any,
  chosen_inline_result?: any,
  callback_query?: any
}

export interface TelegramDriverState {
  startDate: number;
  offset: number;
  updates: Update[]
}

export interface TelegramDriverOptions {
  webhook?: boolean;
  startDate?: number;
}

export type EventsFn = (eventName: string) => Observable<Update>;

export interface TelegramDriverExecution extends IDisposable {
  token: Token;
  observable: Observable<Update>;
  responses: Observable<TelegramAPIResult>;
  events: EventsFn;
}

export interface TelegramDriverSink {
  type: string;
}

export interface TelegramDriverSources {
  message: Observable<Update>;
  inlineQuery: Observable<Update>;
  chosenInlineResult: Observable<Update>;
  callbackQuery: Observable<Update>;
}

export interface TelegramAPIRequest {
  token: Token;
  method: string;
  query: any;
  httpMethod?: string;
}

export interface TelegramAPIResult {}

export interface TelegramAPIResponse {
  ok: boolean;
  description?: string;
  result: TelegramAPIResult
}