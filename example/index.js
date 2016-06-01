import { Observable as $ } from 'rxjs'
import Cycle from '@cycle/rxjs-run'

import { makeTelegramDriver, entityIs } from 'cycle-telegram'
import { matchPlugin } from 'cycle-telegram/plugins'

import { plugins } from './plugins'

let main = ({bot}) => {
  let intents = {
    uptime: bot.observable
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
      .map(x => x.bot),
    intents.inlineQuery::matchPlugin(plugins)
      .map(x => x.bot)
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
  bot: makeTelegramDriver('<YOUR_TOKEN_HERE>'),
  log: (m) => m.forEach(::console.log)
})
