/// <reference path="../../../xstream-typings.d.ts" />

import {
  makeTelegramDriver,
  reply,
  UpdateMessage,
  Update,
  entityIs,
  DriverExecution
} from '../../../lib/index'
import { makePlugins, Plugin } from '../../../lib/plugins'

import * as path from 'path'
import * as tape from 'tape'
import * as tapeNock from 'tape-nock'

import Cycle from '@cycle/xstream-run'
import XsAdapter from '@cycle/xstream-adapter'
import xs from 'xstream'

interface Sources {
  bot: DriverExecution
}

let { matchStream } = makePlugins(XsAdapter)

let isRecord = process.env['NOCK_BACK_MODE'] === 'record'
let onError = (sources: Sources, t: tape.Test) => (err: any) => {
  sources.bot.dispose()
  t.fail(err)
  t.end()
}

let okTake = (t: tape.Test, sources: Sources, next: Function, error = onError(sources, t)) => {
  sources.bot.responses
    .take(1)
    .addListener({
      next (m: any)  {
        sources.bot.dispose()
        next(m)
      },
      error,
      complete () {
        // stub
      }
    })
}

let test = tapeNock(tape, {
  fixtures: path.join(__dirname, '..', isRecord ? 'record-fixtures' : 'record-fixtures'),
  mode: isRecord ? 'record' : 'lockdown'
})

const ACCESS_TOKEN = isRecord ? process.env['ACCESS_TOKEN'] : '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'

test('should reply to command `/help` with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1472895279 * 1000 })
  let plugins: Plugin[] = [
    {
      type: UpdateMessage,
      name: 'help',
      pattern: /\/(help)(?:@goodmind_test_bot)?(\s+(.+))?/,
      component: (sources, u) => ({
        bot: xs.of(reply('Cycle Telegram v1.1.1 (https://git.io/vrs3P)', u))
      })
    },
    {
      type: Update,
      name: 'not-found',
      component: ({ props }) => {
        t.fail(`wrong command \`${props[0]}\``)
      }
    }
  ]
  let main = (s: Sources) => ({
    bot: xs.from([
      matchStream(s.bot.events('message').filter(entityIs('bot_command')), plugins, s)
        .map((x: Sources) => x.bot)
        .flatten()
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  okTake(t, sources, (message: any) => {
    t.ok(
      /\/(help)(?:@goodmind_test_bot)?(\s+(.+))?/.test(message.reply_to_message.text),
      'reply to message text should match `/help` command pattern')
    t.equal(
      message.text,
      'Cycle Telegram v1.1.1 (https://git.io/vrs3P)',
      'message text should be equal to `Cycle Telegram v1.1.1 (https://git.io/vrs3P)`')
    t.end()
  })
})
