import { Observable, IDisposable } from 'rx';
import { TcombWebhookResponse, TcombRequest, TcombUpdate, TcombUpdatesState } from './runtime-types/types';
export declare type Token = string;
export interface DriverOptions {
    webhook?: boolean;
    startDate?: number;
    skipUpdates?: boolean;
}
export declare type EventsFn = (eventName: string) => Observable<TcombUpdate>;
export interface DriverExecution extends IDisposable {
    token: Token;
    updates: Observable<TcombUpdatesState>;
    responses: Observable<any>;
    events: EventsFn;
}
export declare type DriverSink = TcombRequest | TcombWebhookResponse;
export interface DriverSources {
    message: Observable<TcombUpdate>;
    inlineQuery: Observable<TcombUpdate>;
    chosenInlineResult: Observable<TcombUpdate>;
    callbackQuery: Observable<TcombUpdate>;
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
