import { Observable as $ } from 'rx'
import { run } from '@cycle/core'

import express from 'express'
import bodyParser from 'body-parser'
import { makeRouterDriver} from 'cycle-express'
import { Update, makeTelegramDriver, reply, webhook, setWebhook } from 'cycle-telegram'
import { prop } from 'ramda'

let createServer = (router, token) => {
  return router.post(`/${token}/updates`)
    .let(req => {
      return $.catch(
        req.map(req => ({
          id: req.id,
          send: Update(req.body)
        })),
        req.map(req => ({
          id: req.id,
          send: {ok: false, result: 'Invalid request'}
        }))
      )
    })
}

let main = ({bot, router}) => {
  let intents = {
    server: createServer(router, bot.token)
      .share(),
    
    uptime: bot.observable
      .first()
      .share(),
    
    messages: bot.events('message')
      .share()
  }

  let request = $.from([
    intents.server.map(prop('send'))
      .filter(Update.is)
      .map(webhook),

    $.just(setWebhook({ url: `https://example.com/${bot.token}/updates` })),

    intents.messages.map(reply('Reply to message'))
  ])

  let log = $.merge(
    intents.server,
    intents.uptime,
    intents.messages
  )

  return {
    router: intents.server,
    bot: request,
    log: log
  }
}

let app = express()
let router = express.Router()

app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json())
app.use('/', router)

var server = app.listen(app.get('port'), () => {
  console.log(server.address())
})

run(main, {
  router: makeRouterDriver(router),
  bot: makeTelegramDriver('<YOUR_TOKEN_HERE>', { webhook: true }),
  log: (m) => m.forEach(::console.log)
})