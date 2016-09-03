import { TcombUpdate } from './runtime-types/types';
import { Observable } from 'rx';
import * as t from 'tcomb';
export interface ComponentSources {
    [driverName: string]: Observable<any> | any;
}
export declare type ComponentSinks = {
    [driverName: string]: Observable<any>;
} | void;
export declare type Component = (sources: ComponentSources, update: TcombUpdate) => ComponentSinks;
export interface Plugin {
    type: t.Type<any>;
    name: string;
    pattern?: RegExp;
    component: Component;
}
export declare function matchWith(this: Observable<TcombUpdate>, plugins: Plugin[], sources: ComponentSources, {dupe}?: {
    dupe?: boolean;
}): Observable<ComponentSinks>;
export declare function matchStream(observable: Observable<TcombUpdate>, ...args: any[]): any;
