import { TelegramAPIRequest, TelegramAPIResponseResult, TelegramAPIError } from '../interfaces';
import { Observable } from 'rx';
export declare function makeAPIRequest({token, method, query, httpMethod}: TelegramAPIRequest, multipart?: boolean): Observable<TelegramAPIResponseResult | TelegramAPIError>;
