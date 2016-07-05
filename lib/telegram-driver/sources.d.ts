import { Observable, Subject } from 'rx';
import { Token, TelegramDriverState, TelegramDriverSources, Update } from '../interfaces';
export declare function makeUpdates(initialState: TelegramDriverState, token: Token): Observable<TelegramDriverState>;
export declare function makeWebHook(initialState: TelegramDriverState, action: Subject<Update[]>): Observable<any>;
export declare function makeSources(state: Observable<TelegramDriverState>): TelegramDriverSources;
