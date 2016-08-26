import { Observable } from 'rx';
import { TelegramDriverOptions, TelegramDriverExecution, TelegramDriverSink, Token } from '../interfaces';
export declare function makeTelegramDriver(token: Token, options?: TelegramDriverOptions): (request: Observable<Observable<TelegramDriverSink>>) => TelegramDriverExecution;
