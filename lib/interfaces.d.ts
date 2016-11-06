import { Observable, IDisposable } from 'rx';
import { TcombWebhookResponse, TcombRequest, TcombUpdate, TcombUpdatesState } from './runtime-types/types';
export declare type Token = string;
export declare type GenericStream<T> = any;
export declare type DriverSink = TcombRequest | TcombWebhookResponse;
export interface DriverOptions {
    webhook?: boolean;
    startDate?: number;
    skipUpdates?: boolean;
}
export interface DriverSources {
    message: Observable<TcombUpdate>;
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
export declare namespace TelegramAPI {
    interface Request {
        token: Token;
        method: string;
        query: any;
        httpMethod?: string;
        returnType?: string;
    }
    interface ResponseParameters {
        migrate_to_chat_id: string;
        retry_after: number;
    }
    interface Error {
        ok: boolean;
        description: string;
        error_code: number;
        parameters?: ResponseParameters;
    }
    interface ResponseResult {
    }
    interface Response {
        ok: boolean;
        description?: string;
        result: ResponseResult;
    }
}
