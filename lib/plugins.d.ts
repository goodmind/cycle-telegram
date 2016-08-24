import { Update } from './interfaces';
import { Observable } from 'rx';
import * as t from 'tcomb';
export interface ComponentSources {
    [driverName: string]: Observable<any> | any;
}
export declare type ComponentSinks = {
    [driverName: string]: Observable<any>;
} | void;
export declare type Component = (sources: ComponentSources, update: Update) => ComponentSinks;
export interface Plugin {
    type: t.Type<any>;
    name: string;
    pattern?: RegExp;
    component: Component;
}
export declare function matchWith(this: Observable<Update>, plugins: Plugin[], sources: ComponentSources, {dupe}?: {
    dupe?: boolean;
}): Observable<ComponentSinks>;
export declare function matchStream(observable: Observable<Update>, ...args: any[]): any;
