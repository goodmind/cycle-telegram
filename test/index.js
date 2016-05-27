import { run } from '@cycle/core'
import { makeTelegramDriver, reply, answerInlineQuery } from '../lib/index'
import { Observable as $ } from 'rx'

import path from 'path'
import tape from 'tape'
import tapeNock from 'tape-nock'

let test = tapeNock(tape, {
  fixtures: path.join(__dirname, 'fixtures'),
  mode: 'lockdown'
})

const ACCESS_TOKEN = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'

test('should reply to messages with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { startDate: 1464342407440 })
  let { sources } = run(({ bot }) => ({
    bot: $.from([bot.events('message').map(
      reply({text: 'Cycle.js'})
    )])
  }), {
    bot: basicDriver
  })

  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(message => {
      t.equal(message.text, 'Cycle.js',
        'message text should be equal to `Cycle.js`')
      t.end()
    })
})

test('should reply to inline query with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN)
  let results = [
    {
      type: 'article',
      title: 'Cycle.js',
      input_message_content: {
        message_text:
          'A functional and reactive JavaScript framework for cleaner code'
      },
      id: '2o3aajndy0all3di'
    }
  ]
  let { sources } = run(({bot}) => ({
    bot: $.from([bot.events('inline_query').map(
      answerInlineQuery({ results })
    )])
  }), {
    bot: basicDriver
  })

  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(boolean => {
      t.ok(boolean, 'response should be truthy')
      t.end()
    })
})