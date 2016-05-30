import {
  UpdateMessage,
  UpdateInlineQuery,
  getEntityFirst
} from './telegram-driver'
import { find, curryN, prop, compose, isNil, not, merge } from 'ramda'

import isolate from '@cycle/isolate'
import t from 'tcomb'

const UpdateMessageCommand = t.refinement(UpdateMessage,
  compose(not, isNil, getEntityFirst('bot_command')),
  'UpdateMessageCommand')

let matchPluginPath = (plugins, str) => find(
  ({path}) => str.match(path),
  plugins
)

let matchPluginArgs = (str, plugin) => str.match(plugin.path)

let makeResolverWith = curryN(3, (plugins, queryWith, u) => {
  let query = queryWith(u)
  let plugin = matchPluginPath(plugins, query)
  let props = matchPluginArgs(query, plugin)

  return { plugin, props }
})

export let matchPlugin = function (plugins, sources) {
  let resolve = makeResolverWith(plugins)
  let type = (u) => t.match(u,
    UpdateMessageCommand, resolve(
      u => u.message.text.substr(getEntityFirst('bot_command', u).offset)
    ),
    UpdateInlineQuery, resolve(
      u => u.inline_query.query
    ),
    UpdateMessage, resolve(u => u.message.text)
  )

  return this.map(u => {
    let match = type(u)
    let component = {}
    let args = merge({props: match.props}, sources)
    if (match.plugin.type.is(u)) {
      component = isolate(match.plugin.component)(args, u) || {}
    }
    return component
  }).filter(prop('bot'))
}
