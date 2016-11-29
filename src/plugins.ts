import {
  map, when, isEmpty, curryN, match,
  find, filter, not, isNil, compose,
  merge, prop, last, test,
  cond, allPass, T, F, both
} from 'ramda'
import { StreamAdapter } from '@cycle/base'
import { Observable } from 'rx'
import RxAdapter from '@cycle/rx-adapter'
import isolate from '@cycle/isolate'
import * as t from 'tcomb'

import {
  UpdateMessage,
  UpdateInlineQuery,
  getEntityFirst
} from './telegram-driver'
import { convertStream } from './helpers'
import { GenericStream } from './interfaces'
import { TcombUpdate, TcombUpdateMessage, TcombUpdateInlineQuery } from './runtime-types/types'

const UpdateMessageCommand =
  t.refinement<TcombUpdateMessage>(
    UpdateMessage,
    compose(not, isNil, getEntityFirst('bot_command')),
    'UpdateMessageCommand')

const UpdateMessageText =
  t.refinement<TcombUpdateMessage>(
    UpdateMessage,
    compose(not, isNil, (u: TcombUpdateMessage) => u.message.text),
    'UpdateMessageText')

export interface ComponentSources {
  [driverName: string]: GenericStream<any> | any
}

export type ComponentSinks = { [driverName: string]: GenericStream<any> } | void
export type Component = (sources: ComponentSources, update: TcombUpdate) => ComponentSinks
type CurriedToComponent = (plugins: Plugin[], sources: ComponentSources) => ComponentSinks[]

export type Plugin = {
  type: t.Type<any>
  pattern?: RegExp
  name?: string
  component: Component
} | {
  type?: t.Type<any>
  pattern: RegExp
  name?: string
  component: Component
} | {
  type: t.Type<any>
  pattern: RegExp
  name?: string
  component: Component
} | {
  type?: t.Type<any>
  pattern?: RegExp
  name?: string
  component: Component
}

interface PluginProps {
  plugin: Plugin
  props: any[]
}

export interface PluginsExecution {
  matchWith (
    this: GenericStream<TcombUpdate>,
    plugins: Plugin[],
    sources: ComponentSources,
    {dupe}?: {dupe?: boolean}
  ): GenericStream<ComponentSinks>

  matchStream (
    sourceObservable: GenericStream<TcombUpdate>,
    ...args: any[]
  ): GenericStream<ComponentSinks>
}

let getQuery = (update: TcombUpdate): string | null => t.match(
  update,
  UpdateMessageCommand, (u: TcombUpdateMessage) => u.message.text.substr(getEntityFirst('bot_command', u).offset),
  UpdateMessageText, (u: TcombUpdateMessage) => update.message.text,
  UpdateInlineQuery, (u: TcombUpdateInlineQuery) => update.inline_query.query,
  t.Any, () => null)

let matchPattern =
  curryN(2, (query: string, {pattern}: Plugin): any[] =>
    pattern ? match(pattern, query) : [])

let testPattern =
  curryN(2, (query: string, {pattern}: Plugin): boolean =>
    pattern ? test(pattern, query) : false)

let testType =
  curryN(2, (update: TcombUpdate, {type}: Plugin): boolean =>
    type ? type.is(update) : false)

let getProps = matchPattern

let toProps =
  curryN(2, (query: string, plugin: Plugin): PluginProps =>
    ({ plugin, props: getProps(query, plugin) }))

let toIsolate =
  curryN(3, (
    update: TcombUpdate,
    sources: ComponentSources,
    {plugin, props}: PluginProps
  ): ComponentSinks => isolate(plugin.component)(
    merge({ props }, sources),
    update))

let isolatePlugin =
  curryN(4, (
    update: TcombUpdate,
    sources: ComponentSources,
    query: string,
    plugin: Plugin
  ): ComponentSinks => toIsolate(
    update,
    sources,
    toProps(query, plugin)))

let transform =
  (plugins: Plugin[],
   sources: ComponentSources,
   update: TcombUpdate,
   pluginNotFound: Plugin): ComponentSinks[] => map<Plugin, ComponentSinks>(
    isolatePlugin(update, sources, getQuery(update)),
    when(
      isEmpty,
      () => [pluginNotFound],
      plugins))

let makeComponentSelector =
  curryN(4, (f: (query: string, update: TcombUpdate, plugins: Plugin[]) => Plugin[],
   update: TcombUpdate,
   plugins: Plugin[],
   sources: ComponentSources): ComponentSinks[] => when(isNil, () => [], transform(
    f(getQuery(update), update, plugins),
    sources,
    update,
    last(plugins))))

let checkTypeAndQuery =
  curryN(2, (update: TcombUpdate, query: string) => cond([
    [allPass([prop('type'), prop('pattern')]), both(testType(update), testPattern(query))],
    [prop('type'), testType(update)],
    [prop('pattern'), testPattern(query)],
    [T, F]
  ]))

interface ToComponents { (u: TcombUpdate): (plugins: Plugin[], sources: ComponentSources) => ComponentSinks[] }
let toComponents: ToComponents = makeComponentSelector(
  (query: string, update: TcombUpdate, plugins: Plugin[]) =>
    filter(checkTypeAndQuery(update, query), plugins))

interface ToComponent { (u: TcombUpdate): (plugins: Plugin[], sources: ComponentSources) => ComponentSinks[] }
let toComponent: ToComponent = makeComponentSelector(
  (query: string, update: TcombUpdate, plugins: Plugin[]) =>
    [find(checkTypeAndQuery(update, query), plugins)])

export function makePlugins (externalSA: StreamAdapter = RxAdapter): PluginsExecution {
  function matchWith (
    this: GenericStream<TcombUpdate>,
    plugins: Plugin[],
    sources: ComponentSources,
    {dupe = true, sourceName = 'bot'} = {dupe: true, sourceName: 'bot'}
  ) {
    return convertStream(
      (convertStream(this, externalSA, RxAdapter) as Observable<TcombUpdate>)
        .map(u => dupe ? toComponents(u) : toComponent(u))
        .flatMap((f: CurriedToComponent) => f(plugins, sources))
        .filter(prop(sourceName)),
      RxAdapter,
      externalSA)
  }

  function matchStream (sourceObservable: GenericStream<TcombUpdate>, ...args: any[]) {
    return matchWith.apply(convertStream(sourceObservable, externalSA, RxAdapter), args)
  }

  return { matchWith, matchStream }
}

export let { matchWith, matchStream } = makePlugins()
