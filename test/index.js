import { run } from '@cycle/core'
import { makeTelegramDriver, reply, answerInlineQuery } from '../lib/index'
import { Observable as $ } from 'rx'

import path from 'path'
import tape from 'tape'
import tapeNock from 'tape-nock'

console.log(path.join(__dirname, 'fixtures'))

let test = tapeNock(tape, {
  fixtures: path.join(__dirname, 'fixtures'),
  mode: 'record'
})

test.nock.enableNetConnect()

let basicDriver =
  makeTelegramDriver('<YOUR_TOKEN_HERE>')

test('should reply to messages with basic driver', t => {
  let { sources } = run(({bot}) => ({
    bot: $.from([bot.events('message').map(
      reply({text: 'Cycle.js'})
    )])
  }), {
    bot: basicDriver
  })

  sources.bot.responses.take(1).subscribe(message => {
    t.equal(message.text, 'Cycle.js',
      'message text should be equal to `Cycle.js`')
    t.end()
  })
})

test('should reply to inline query with basic driver', t => {
  let results = [
    {
      type: 'article',
      title: 'Cycle.js',
      input_message_content: {
        message_text:
          'A functional and reactive JavaScript framework for cleaner code'
      }
    }
  ]
  let { sources } = run(({bot}) => ({
    bot: $.from([bot.events('inline_query').map(
      answerInlineQuery({ results })
    )])
  }), {
    bot: basicDriver
  })

  sources.bot.responses.take(1).subscribe(boolean => {
    t.ok(boolean, 'response should be truthy')
    t.end()
  })
})

test.onFinish(() => {
  let { sources } = run(() => ({}), {
    bot: basicDriver
  })

  sources.bot.dispose()
})
