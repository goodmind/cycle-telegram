import { Observable, Subject } from 'rx';
import { Token, DriverSources } from '../interfaces';
import { TcombUpdate, TcombUpdatesState } from '../runtime-types/types';
export declare function makeUpdates(initialState: TcombUpdatesState, token: Token): Observable<TcombUpdatesState>;
export declare function makeWebHook(initialState: TcombUpdatesState, action: Subject<TcombUpdate[]>): Observable<TcombUpdatesState>;
export declare function makeSources(state: Observable<TcombUpdatesState>): DriverSources;
