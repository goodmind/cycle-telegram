import {
  UpdateMessage,
  UpdateInlineQuery,
  getEntityFirst
} from './telegram-driver'
import { when, isEmpty, curryN, match, find, filter, not, isNil, compose, merge, prop, last, test } from 'ramda'

import isolate from '@cycle/isolate'
import t from 'tcomb'

const UpdateMessageCommand = t.refinement(UpdateMessage,
  compose(not, isNil, getEntityFirst('bot_command')),
  'UpdateMessageCommand')

const UpdateMessageText = t.refinement(UpdateMessage,
  compose(not, isNil, (u) => u.message.text),
  'UpdateMessageText')

let getQuery = (update) => t.match(update,
  UpdateMessageCommand,
    (u) => u.message.text.substr(getEntityFirst('bot_command', u).offset),
  UpdateMessageText,
    (u) => update.message.text,
  UpdateInlineQuery,
    (u) => update.inline_query.query,
  t.Any,
    () => null)

let matchPattern = curryN(2,
  (query, {pattern}) =>
    pattern ? match(pattern, query) : [])

let testPattern = curryN(2,
  (query, {pattern}) =>
    pattern ? test(pattern, query) : false)

let getProps = matchPattern

let toProps = curryN(2,
  (query, plugin) =>
    ({ plugin, props: getProps(query, plugin) }))

let toIsolate = curryN(3,
  (update, sources, {plugin, props}) =>
    isolate(plugin.component)(
      merge({ props }, sources),
      update))

let isolatePlugin = curryN(4,
  (update, sources, query, plugin) =>
    toIsolate(update, sources,
      toProps(query, plugin)))

let transform =
  (plugins, sources, update, pluginNotFound) => when(
    isEmpty,
    () => [pluginNotFound],
    plugins
      .filter(prop('pattern'))
      .map(isolatePlugin(
        update,
        sources,
        getQuery(update))))

let makeComponentSelector = curryN(4,
  (f, update, plugins, sources) => {
    let query = getQuery(update)
    let components = f(query, plugins)
    let lastIsolated = isolatePlugin(update, sources, query, last(plugins))
    return query !== null ? transform(components, sources, update, lastIsolated) : []
  })

let toComponents = makeComponentSelector(
  (query, plugins) =>
    filter(testPattern(query), plugins))

let toComponent = makeComponentSelector(
  (query, plugins) =>
    [find(testPattern(query), plugins)])

export function matchWith (plugins, sources, {dupe = true} = {dupe: true}) {
  return this
    .map(x => dupe ? toComponents(x) : toComponent(x))
    .flatMap(f => f(plugins, sources))
    .filter(prop('bot'))
}
