import { Observable } from 'rx';
import { DriverOptions, DriverExecution, DriverSink, Token } from '../interfaces';
export declare function makeTelegramDriver(token: Token, options?: DriverOptions): (request: Observable<Observable<DriverSink>>) => DriverExecution;
