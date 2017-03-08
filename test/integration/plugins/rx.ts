/// <reference path="../../../rx-typings.d.ts" />
import {
  makeTelegramDriver,
  reply,
  UpdateMessage,
  Update,
  entityIs,
  DriverExecution
} from '../../../lib/index'
import {
  Message,
  TcombMessage
} from '../../../lib/index'
import { makePlugins, Plugin } from '../../../lib/plugins'
import { OkTakeFn, OnErrorFn } from '../../interfaces'

import * as path from 'path'
import * as tape from 'tape'
import * as tapeNock from 'tape-nock'

import Cycle from '@cycle/rx-run'
import RxAdapter from '@cycle/rx-adapter'
import { Observable as $ } from 'rx'

interface Sources {
  bot: DriverExecution
}

const { matchStream } = makePlugins(RxAdapter)
const isRecord = process.env['NOCK_BACK_MODE'] === 'record'
const FIXTURES_WRITE_PATH = path.join(__dirname, '..', isRecord ? 'record-fixtures' : 'fixtures')
const test = tapeNock(tape, {
  fixtures: FIXTURES_WRITE_PATH,
  mode: isRecord ? 'record' : 'lockdown'
})
const ACCESS_TOKEN = isRecord ? process.env['ACCESS_TOKEN'] : '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'

const onError: OnErrorFn<Sources> = (sources, t) => (err) => {
  sources.bot.dispose()
  console.error('test error: ', err)
  t.fail(err)
  t.end()
}
const okTake: OkTakeFn<Sources> = <T>(t, sources, next, error = onError(sources, t)) => {
  sources.bot.responses
    .take(1)
    .subscribe(
      (m: T) => {
        sources.bot.dispose()
        next(m)
      },
      error,
      () => undefined
    )
}

test('should reply to command `/help` with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1472895279 * 1000 })
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
  let main = (s: Sources) => ({
    bot: $.from([
      matchStream(s.bot.events('message').filter(entityIs('bot_command')), plugins, s)
        .pluck('bot')
        .mergeAll()
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
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
