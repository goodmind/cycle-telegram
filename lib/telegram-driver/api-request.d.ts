import { TelegramAPI } from '../interfaces';
import { Observable } from 'rx';
export declare type OriginalResponseStream = Observable<TelegramAPI.ResponseResult | TelegramAPI.Error>;
export declare type ResponseStream = Observable<TelegramAPI.ResponseResult | TelegramAPI.Error> & {
    request: TelegramAPI.Request;
};
export declare function makeAPIRequest(apiReq: TelegramAPI.Request, multipart?: boolean): Observable<ResponseStream>;
