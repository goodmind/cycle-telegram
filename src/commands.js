import { find, takeLast, curry } from 'ramda'
import { getEntityFirst } from './telegram-driver/index'

export let commandName = (update) => {
  return getEntityFirst('bot_command')(update)
}

export let findCommandIn = curry((commands, path) => {
  let match = find(([r, _]) => path.match(r), commands)

  if (!match) {
    match = takeLast(1, commands)[0]
  }

  return [match[0], match[1]]
})
