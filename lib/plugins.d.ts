import { StreamAdapter } from '@cycle/base';
import * as t from 'tcomb';
import { GenericStream } from './interfaces';
import { TcombUpdate } from './runtime-types/types';
export interface ComponentSources {
    [driverName: string]: GenericStream<any> | any;
}
export declare type ComponentSinks = {
    [driverName: string]: GenericStream<any>;
} | void;
export declare type Component = (sources: ComponentSources, update: TcombUpdate) => ComponentSinks;
export declare type Plugin = {
    type: t.Type<any>;
    pattern?: RegExp;
    name?: string;
    component: Component;
} | {
    type?: t.Type<any>;
    pattern: RegExp;
    name?: string;
    component: Component;
} | {
    type: t.Type<any>;
    pattern: RegExp;
    name?: string;
    component: Component;
} | {
    type?: t.Type<any>;
    pattern?: RegExp;
    name?: string;
    component: Component;
};
export interface PluginsExecution {
    matchWith(this: GenericStream<TcombUpdate>, plugins: Plugin[], sources: ComponentSources, {dupe}?: {
        dupe?: boolean;
    }): GenericStream<ComponentSinks>;
    matchStream(sourceObservable: GenericStream<TcombUpdate>, ...args: any[]): GenericStream<ComponentSinks>;
}
export declare function makePlugins(externalSA?: StreamAdapter): PluginsExecution;
export declare let matchWith: (this: any, plugins: Plugin[], sources: ComponentSources, {dupe}?: {
    dupe?: boolean;
}) => any, matchStream: (sourceObservable: any, ...args: any[]) => any;
