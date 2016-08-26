import { makeTelegramDriver, reply, answerInlineQuery, UpdateMessage, Update, entityIs } from '../../lib/index'
import { matchStream, Plugin, ComponentSources } from '../../lib/plugins'

import * as path from 'path'
import * as tape from 'tape'
import * as tapeNock from 'tape-nock'

import Cycle from '@cycle/core'
import { Observable as $ } from 'rx'

let test = tapeNock(tape, {
  fixtures: path.join(__dirname, 'fixtures'),
  mode: 'lockdown'
})

const ACCESS_TOKEN = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'

test('should reply to messages with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { startDate: 1464342407440 })
  let { sources, run } = Cycle(({ bot }: any) => ({
    bot: $.from([
      bot.events('message').map(reply('Cycle.js'))
    ])
  }), {
    bot: basicDriver
  })

  run()

  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe((message: any) => {
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
  let { sources, run } = Cycle(({ bot }: any) => ({
    bot: $.from([
      bot.events('inline_query').map(answerInlineQuery(results))
    ])
  }), {
    bot: basicDriver
  })

  run()

  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe((boolean: boolean) => {
      t.ok(boolean, 'response should be truthy')
      t.end()
    })
})

test('should reply to command `/help` with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { startDate: 1464342407440 })
  let plugins: Plugin[] = [
    {
      type: UpdateMessage,
      name: 'help',
      pattern: /\/(help)(?:@goodmind_test_bot)?(\s+(.+))?/,
      component: ({ props }, u) => ({
        bot: $.just(reply('Cycle Telegram v1.1.1 (https://git.io/vrs3P)', u))
      })},
    {
      type: Update,
      name: 'not-found',
      component: ({props}) => {
        t.fail(`wrong command \`${props[0]}\``)
      }}
  ]
  let { sources, run } = Cycle((s: { bot: any }) => ({
    bot: $.from([
      matchStream(s.bot.events('message').filter(entityIs('bot_command')), plugins, s)
        .pluck('bot')
        .mergeAll()
    ])
  }), {
    bot: basicDriver
  })

  run()

  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe((message: any) => {
      t.ok(/\/(help)(?:@goodmind_test_bot)?(\s+(.+))?/.test(message.reply_to_message.text),
        'reply to message text should match `/help` command pattern')
      t.equal(message.text, 'Cycle Telegram v1.1.1 (https://git.io/vrs3P)',
        'message text should be equal to `Cycle Telegram v1.1.1 (https://git.io/vrs3P)`')
      t.end()
    })
})

test('should forward message with basic driver', t => {
  
  t.end()
})

test('should send photo with basic driver', t => {
  
  t.end()
})

test('should send audio with basic driver', t => {
  
  t.end()
})

test('should send document with basic driver', t => {
  
  t.end()
})

test('should send sticker with basic driver', t => {
  
  t.end()
})

test('should send video with basic driver', t => {
  
  t.end()
})

test('should send voice with basic driver', t => {
  
  t.end()
})

test('should send location with basic driver', t => {
  
  t.end()
})

test('should send venue with basic driver', t => {
  
  t.end()
})

test('should send contact with basic driver', t => {
  
  t.end()
})

test('should send get user profile photos with basic driver', t => {
  
  t.end()
})

test('should get file with basic driver', t => {
  
  t.end()
})

test('should leave chat with basic driver', t => {
  
  t.end()
})

test('should unban chat member with basic driver', t => {
  
  t.end()
})

test('should get chat with basic driver', t => {
  
  t.end()
})

test('should get chat administrators with basic driver', t => {
  
  t.end()
})

test('should get chat members count with basic driver', t => {
  
  t.end()
})

test('should get chat member with basic driver', t => {
  
  t.end()
})

test('should answer callback query with basic driver', t => {
  
  t.end()
})

test('should edit message text with basic driver', t => {
  
  t.end()
})

test('should edit message caption with basic driver', t => {
  
  t.end()
})

test('should edit message reply markup with basic driver', t => {
  
  t.end()
})
