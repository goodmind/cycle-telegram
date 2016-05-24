# Cycle Telegram Driver

[![Join the chat](https://img.shields.io/badge/chat-on_telegram-blue.svg)](https://telegram.me/cyclejs) [![Join the chat at https://gitter.im/goodmind/cycle-telegram](https://badges.gitter.im/goodmind/cycle-telegram.svg)](https://gitter.im/goodmind/cycle-telegram?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A  [Cycle.js](http://cycle.js.org) [Driver](http://cycle.js.org/drivers.html) for [Telegram](https://telegram.org/)

```
npm install cycle-telegram
```

[![npm version](https://badge.fury.io/js/cycle-telegram.svg)](https://badge.fury.io/js/cycle-telegram)

## Usage

```js
import {makeTelegramDriver, reply} from 'cycle-telegram'
import {run} from '@cycle/core'

import Rx from 'rx'

let main = ({bot}) => {
  let intents = {
    uptime: bot.observable
      .first()
      .share(),

    messages: bot.events('message')
      .share()
  }

  let request = Rx.Observable.from([
    intents.messages.map(reply({
      text: 'Reply to message'
    }))
  ])

  let log = Rx.Observable.merge(
    intents.uptime,
    intents.messages
  )

  return {
    bot: request,
    log: log
  }
}

run(main, {
  bot: makeTelegramDriver('<YOUR_TOKEN_HERE>'),
  log: (m) => m.forEach(::console.log)
})
```

## Webhook with Express
```js
import express from 'express'
import bodyParser from 'body-parser'
import Rx from 'rx'

import {makeRouterDriver} from 'cycle-express'
import {Update, makeTelegramDriver, reply, webhook, setWebhook} from 'cycle-telegram'
import {run} from '@cycle/core'
import {prop} from 'ramda'

let createServer = (router, token) => {
  return router.post(`/${token}/updates`)
    .let(req => {
      return Rx.Observable.catch(
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
    server: createServer(router, bot.token).share(),

    uptime: bot.observable
      .first()
      .share(),

    messages: bot.events('message')
      .share()
  }

  let request = Rx.Observable.from([
    intents.server.map(prop('send'))
      .filter(Update.is)
      .map(webhook),

    Rx.Observable.just(setWebhook({url: `https://example.com/${bot.token}/updates`})),

    intents.messages.map(reply({
      text: 'Reply to message'
    }))
  ])

  let log = Rx.Observable.merge(
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
  bot: makeTelegramDriver('<YOUR_TOKEN_HERE>', {webhook: true}),
  log: (m) => m.forEach(::console.log)
})
```


- - -

[![Dependency Status](https://david-dm.org/goodmind/cycle-telegram.svg)](https://david-dm.org/goodmind/cycle-telegram)
[![devDependency Status](https://david-dm.org/goodmind/cycle-telegram/dev-status.svg)](https://david-dm.org/goodmind/cycle-telegram#info=devDependencies)
