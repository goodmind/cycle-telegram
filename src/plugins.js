import { find, takeLast, curryN } from 'ramda'
import { getEntityFirstValue } from './telegram-driver/index'

export let commandName = (update) => getEntityFirstValue('bot_command')(update)

export let findCommandIn = curryN(2, (commands, path) => {
  let match = find(
      ([r, _]) => path.match(r),
      commands
    ) || takeLast(1, commands)[0]

  return [match[0], match[1]]
})
