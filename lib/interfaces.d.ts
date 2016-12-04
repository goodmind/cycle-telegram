import { Observable, IDisposable } from 'rx';
import { TcombWebhookResponse, TcombRequest, TcombUpdate, TcombUpdatesState } from './runtime-types/types';
export declare type Token = string;
export declare type GenericStream<T> = any;
export declare type DriverSink = TcombRequest | TcombWebhookResponse;
export declare type EventNames = 'message' | 'channel_post' | 'edited_channel_post' | 'inline_query' | 'chosen_inline_result' | 'callback_query';
export interface DriverOptions {
    webhook?: boolean;
    startDate?: number;
    skipUpdates?: boolean;
}
export interface DriverSources {
    message: Observable<TcombUpdate>;
    channelPost: Observable<TcombUpdate>;
    editedChannelPost: Observable<TcombUpdate>;
    inlineQuery: Observable<TcombUpdate>;
    chosenInlineResult: Observable<TcombUpdate>;
    callbackQuery: Observable<TcombUpdate>;
}
export interface DriverExecution extends IDisposable {
    token: Token;
    updates: GenericStream<TcombUpdatesState>;
    responses: GenericStream<any>;
    events(eventName: string): GenericStream<TcombUpdate>;
}
export interface TelegramAPIRequest {
    token: Token;
    method: string;
    query: any;
    httpMethod?: string;
}
export interface TelegramAPIError {
    ok: boolean;
    description: string;
    error_code: number;
}
export interface TelegramAPIResponseResult {
}
export interface TelegramAPIResponse {
    ok: boolean;
    description?: string;
    result: TelegramAPIResponseResult;
}
