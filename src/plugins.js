import {
  UpdateMessage,
  UpdateInlineQuery,
  getEntityFirst
} from './telegram-driver'
import { find, curryN, prop } from 'ramda'

import t from 'tcomb'

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

export let matchPlugin = function (plugins) {
  let resolve = makeResolverWith(plugins)
  let type = (u) => t.match(u,
    UpdateMessage, resolve(
      u => u.message.text.substr(getEntityFirst('bot_command', u).offset)
    ),
    UpdateInlineQuery, resolve(
      u => u.inline_query.query
    )
  )

  return this.map(u => {
    let match = type(u)
    let component = {}
    if (match.plugin.type.is(u)) {
      component = match.plugin.component({props: match.props}, u) || {}
    }
    return component
  }).filter(prop('bot'))
}
