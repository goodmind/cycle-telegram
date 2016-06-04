import {
  UpdateMessage,
  UpdateInlineQuery,
  getEntityFirst
} from './telegram-driver'
import { Update } from './interfaces'
import { map, when, isEmpty, curryN, match, find, filter, not, isNil, compose, merge, prop, last, test } from 'ramda'

import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import t from 'tcomb'

const UpdateMessageCommand = t.refinement(UpdateMessage,
  compose(not, isNil, getEntityFirst('bot_command')),
  'UpdateMessageCommand')

const UpdateMessageText = t.refinement(UpdateMessage,
  compose(not, isNil, (u) => u.message.text),
  'UpdateMessageText')

interface ComponentSources {
  props?: any[];
  [driverName: string]: Observable;
}

interface ComponentSinks {
  [driverName: string]: Observable
}

type Component = (sources: ComponentSources, update: Update) => ComponentSinks;

interface Plugin {
  type: t.Type;
  name: string;
  pattern?: RegExp;
  component: Component
}

interface PluginProps {
  plugin: Plugin;
  props: any[]
}

let getQuery = (update: Update): string | null => t.match(update,
  UpdateMessageCommand,
    (u) => u.message.text.substr(getEntityFirst('bot_command', u).offset),
  UpdateMessageText,
    (u) => update.message.text,
  UpdateInlineQuery,
    (u) => update.inline_query.query,
  t.Any,
    () => null)

let matchPattern = curryN(2,
  (query: string, {pattern}: Plugin): any[] =>
    pattern ? match(pattern, query) : [])

let testPattern = curryN(2,
  (query: string, {pattern}: Plugin): boolean =>
    pattern ? test(pattern, query) : false)

let getProps = matchPattern

let toProps = curryN(2,
  (query: string, plugin: Plugin): PluginProps =>
    ({ plugin, props: getProps(query, plugin) }))

let toIsolate = curryN(3,
  (update: Update, sources: ComponentSources, {plugin, props}: PluginProps): ComponentSinks =>
    isolate(plugin.component)(
      merge({ props }, sources),
      update))

let isolatePlugin = curryN(4,
  (update: Update, sources: ComponentSources, query: string, plugin: Plugin): ComponentSinks =>
    toIsolate(update, sources,
      toProps(query, plugin)))

let transform =
  (plugins: Plugin[], sources: ComponentSources, update: Update, pluginNotFound: Plugin): ComponentSinks[] => map(
    isolatePlugin(update, sources, getQuery(update)),
    when(
      isEmpty,
      () => [pluginNotFound],
      filter(prop('pattern'), plugins)))

let makeComponentSelector = curryN(4,
  (f: (query: string, plugins: Plugin[]) => Plugin[],
   update: Update,
   plugins: Plugin[],
   sources: ComponentSources): ComponentSinks[] => when(isNil, [], transform(
    f(getQuery(update), plugins),
    sources,
    update,
    last(plugins))))

let toComponents = makeComponentSelector(
  (query: string, plugins: Plugin[]) =>
    filter(testPattern(query), plugins))

let toComponent = makeComponentSelector(
  (query: string, plugins: Plugin[]) =>
    [find(testPattern(query), plugins)])

export function matchWith (plugins: Plugin[], sources: ComponentSources, {dupe = true} = {dupe: true}): Observable<ComponentSinks> {
  return this
    .map((u: Update) => dupe ? toComponents(u) : toComponent(u))
    .flatMap(f => f(plugins, sources))
    .filter(prop('bot'))
}
