import { Observable as $ } from 'rxjs'
import Cycle from '@cycle/rxjs-run'

import { makeTelegramDriver, entityIs } from 'cycle-telegram'
import { matchPlugin } from 'cycle-telegram/plugins'

import { plugins } from './plugins'

const ACCESS_TOKEN = process.env['ACCESS_TOKEN'] || '<YOUR_TOKEN_HERE>'

let main = ({bot}) => {
  let intents = {
    uptime: bot.updates
      .first()
      .share(),

    messages: bot.events('message')
      .share(),

    inlineQuery: bot.events('inline_query')
      .share(),

    commands: bot.events('message')
      .filter(entityIs('bot_command'))
      .share()
  }

  let request = $.from([
    intents.commands::matchPlugin(plugins)
      .pluck('bot'),
    intents.inlineQuery::matchPlugin(plugins)
      .pluck('bot')
  ])

  let log = $.merge(
    intents.uptime,
    intents.messages,
    intents.inlineQuery
  )

  return {
    bot: request,
    log: log
  }
}

Cycle.run(main, {
  bot: makeTelegramDriver(ACCESS_TOKEN),
  log: (m) => m.forEach(::console.log)
})
