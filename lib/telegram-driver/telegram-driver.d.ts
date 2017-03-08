import { StreamAdapter } from '@cycle/base';
import { Observable } from 'rxjs';
import { DriverOptions, DriverExecution, DriverSink, Token } from '../interfaces';
export declare function makeTelegramDriver(token: Token, options?: DriverOptions): (sourceRequest: Observable<Observable<DriverSink>>, runSA: StreamAdapter) => DriverExecution;
