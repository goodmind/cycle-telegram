import {
  makeTelegramDriver,
  reply,
  UpdateMessage,
  Update,
  entityIs
} from '../../lib/index'
import { matchStream, Plugin } from '../../lib/plugins'

import * as path from 'path'
import * as tape from 'tape'
import * as tapeNock from 'tape-nock'

import Cycle from '@cycle/core'
import { Observable as $ } from 'rx'

let isRecord = process.env.NOCK_BACK_MODE === 'record'
let onError = (sources, t) => (err) => {
  sources.bot.dispose()
  t.fail(err)
  t.end()
}

let test = tapeNock(tape, {
  fixtures: path.join(__dirname, isRecord ? 'record-fixtures' : 'fixtures'),
  mode: isRecord ? 'record' : 'lockdown'
})

const ACCESS_TOKEN = isRecord ? process.env.ACCESS_TOKEN : '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'

test('should reply to command `/help` with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1464342407440 })
  let plugins: Plugin[] = [
    {
      type: UpdateMessage,
      name: 'help',
      pattern: /\/(help)(?:@goodmind_test_bot)?(\s+(.+))?/,
      component: (sources, u) => ({
        bot: $.just(reply('Cycle Telegram v1.1.1 (https://git.io/vrs3P)', u))
      })},
    {
      type: Update,
      name: 'not-found',
      component: ({ props }) => {
        t.fail(`wrong command \`${props[0]}\``)
      }}
  ]
  let main = (s: { bot: any }) => ({
    bot: $.from([
      matchStream(s.bot.events('message').filter(entityIs('bot_command')), plugins, s)
        .pluck('bot')
        .mergeAll()
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        t.ok(
          /\/(help)(?:@goodmind_test_bot)?(\s+(.+))?/.test(message.reply_to_message.text),
          'reply to message text should match `/help` command pattern')
        t.equal(
          message.text,
          'Cycle Telegram v1.1.1 (https://git.io/vrs3P)',
          'message text should be equal to `Cycle Telegram v1.1.1 (https://git.io/vrs3P)`')
        t.end()
      },
      onError(sources, t))
})
