/// <reference path="../../../rxjs-typings.d.ts" />
/* tslint:disable */
import {
  makeTelegramDriver,
  getMe,
  reply,
  forwardMessage,
  sendPhoto,
  sendAudio,
  sendDocument,
  sendSticker,
  sendVideo,
  sendVoice,
  sendLocation,
  sendVenue,
  sendContact,
  sendChatAction,
  getUserProfilePhotos,
  getFile,
  kickChatMember,
  leaveChat,
  unbanChatMember,
  getChat,
  getChatAdministrators,
  getChatMembersCount,
  getChatMember,
  answerCallbackQuery,
  editMessageText,
  editMessageCaption,
  editMessageReplyMarkup,
  answerInlineQuery,
  DriverExecution
} from '../../../lib/index'
/* tslint:enable */

import * as path from 'path'
import * as tape from 'tape'
import * as tapeNock from 'tape-nock'
import * as fs from 'fs'

import Cycle from '@cycle/rxjs-run'
import { Observable as $ } from 'rxjs'
import { is } from 'ramda'

interface Sources {
  bot: DriverExecution
}

let isRecord = process.env['NOCK_BACK_MODE'] === 'record'
let onError = (sources: Sources, t: tape.Test) => (err: any) => {
  sources.bot.dispose()
  console.error('test error: ', err)
  t.fail(err)
  t.end()
}
/*
let okTake = (t: tape.Test, sources: Sources, next: Function, error = onError(sources, t)) => {
  sources.bot.responses
    .take(1)
    .subscribe((m: any) => {
      sources.bot.dispose()
      next(m)
    }, error)
}

let okDrop = (t: tape.Test, sources: Sources, next: Function, error = onError(sources, t)) => {
  sources.bot.responses
    .skip(1)
    .subscribe((m: any) => {
      sources.bot.dispose()
      next(m)
    }, error)
}*/

const FIXTURES_WRITE_PATH = path.join(__dirname, '..', isRecord ? 'record-fixtures' : 'fixtures')
const FIXTURES_PATH = path.join(__dirname, '..', 'fixtures')

let test = tapeNock(tape, {
  fixtures: FIXTURES_WRITE_PATH,
  mode: isRecord ? 'record' : 'lockdown'
})

const ACCESS_TOKEN = isRecord ? process.env['ACCESS_TOKEN'] : '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
const GROUP_ID = -175523088
const SUPERGROUP_ID = -1001086044029

if (isRecord) {
  console.log('Recording mode')
}

test('should get me with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(getMe())
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (user: any) => {
        t.ok(user.hasOwnProperty('id'), 'user object has property id')
        t.ok(user.hasOwnProperty('first_name'), 'user object has property first_name')
        t.ok(user.hasOwnProperty('username'), 'user object has property username')
        t.end()
      },
      onError(sources, t))
})

test('should reply to messages with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1464342407440 })
  let main = ({ bot }: Sources) => ({
    bot: $.from([
      bot.events('message').map(reply('Cycle.js'))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        t.equal(message.text, 'Cycle.js', 'message text should be equal to `Cycle.js`')
        t.end()
      },
      onError(sources, t))
})

test('should forward message with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(forwardMessage(
        { chat_id: GROUP_ID, from_chat_id: GROUP_ID, message_id: 4515 },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver})

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        t.ok(is(Object, message), 'message is object')
        t.end()
      },
      onError(sources, t))
})

test('should send photo with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendPhoto(
        { chat_id: GROUP_ID, photo: fs.createReadStream(path.join(FIXTURES_PATH, 'test.jpg')) },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        t.ok(message.hasOwnProperty('photo'), 'message has property photo')
        t.end()
      },
      onError(sources, t))
})

test('should send audio with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendAudio(
        {
          chat_id: GROUP_ID,
          audio: fs.createReadStream(path.join(FIXTURES_PATH, 'test.ogg')),
          performer: 'Skiessi',
          title: 'RandomProjectNumber14253'
        },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        t.ok(message.voice.mime_type === 'audio/ogg', 'mime type should be audio/ogg')
        t.end()
      },
      onError(sources, t))
})

test.skip('should send document with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendDocument(
        { chat_id: GROUP_ID, document: fs.createReadStream(path.join(FIXTURES_PATH, 'test.jpg')) },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        t.ok(message.document.file_name === 'test.jpg', 'file name should be test.jpg')
        t.end()
      },
      onError(sources, t))
})

test.skip('should send sticker with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendSticker(
        { chat_id: GROUP_ID, sticker: '' },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        console.log(message)
        t.end()
      },
      onError(sources, t))
})

test.skip('should send video with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendVideo(
        { chat_id: GROUP_ID, video: '' },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        console.log(message)
        t.end()
      },
      onError(sources, t))
})

test.skip('should send voice with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendVoice(
        { chat_id: GROUP_ID, voice: '' },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        console.log(message)
        t.end()
      },
      onError(sources, t))
})

test('should send location with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendLocation(
        { chat_id: GROUP_ID, latitude: 55.751244, longitude: 37.618423 },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        t.ok(message.hasOwnProperty('location'), 'message has property location')
        t.end()
      },
      onError(sources, t))
})

test('should send venue with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendVenue(
        {
          chat_id: GROUP_ID,
          latitude: 55.7554244,
          longitude: 37.6132518,
          title: 'Red Square',
          address: 'Moscow, Russia'
        },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        t.ok(message.hasOwnProperty('venue'), 'message has property venue')
        t.ok(message.venue.title === 'Red Square', 'venue title should be Red Square')
        t.ok(message.venue.address === 'Moscow, Russia', 'venue title should be Moscow, Russia')
        t.end()
      },
      onError(sources, t))
})

test('should send contact with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendContact(
        { chat_id: GROUP_ID, phone_number: '+42470', first_name: 'Telegram' },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (message: any) => {
        t.ok(message.hasOwnProperty('contact'), 'message has property contact')
        t.ok(message.contact.phone_number === '+42470', 'contact phone number should be +42470')
        t.ok(message.contact.first_name === 'Telegram', 'contact first name should be Telegram')
        t.end()
      },
      onError(sources, t))
})

test('should send chat action with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(sendChatAction(
        { chat_id: GROUP_ID, action: 'typing' },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (bool: boolean) => {
        t.ok(bool === true, 'bool should be true')
        t.end()
      },
      onError(sources, t))
})

test('should get user profile photos with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(getUserProfilePhotos(
        { user_id: 39759851 },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (userProfilePhotos: any) => {
        t.ok(userProfilePhotos.hasOwnProperty('total_count'), 'user profile photos has property total_count')
        t.ok(typeof userProfilePhotos.total_count === 'number', 'total_count should be number')
        t.ok(userProfilePhotos.hasOwnProperty('photos'), 'user profile photos has property photos')
        t.end()
      },
      onError(sources, t))
})

test('should get file with basic driver', t => {
  const FILE_ID = 'AgADAgADx6cxGxnDdgxSdsYg3HzwDz8McQ0ABDBxKl75YR5CapIBAAEC'
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(getFile(
        { file_id: FILE_ID },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (file: any) => {
        t.ok(file.file_id === FILE_ID, 'file ids should be equal')
        t.end()
      },
      onError(sources, t))
})

test('should kick chat member with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(kickChatMember(
        { chat_id: SUPERGROUP_ID, user_id: 115000496 },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (bool: boolean) => {
        t.ok(bool === true, 'bool should be true')
        t.end()
      },
      onError(sources, t))
})

test('should unban chat member with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(unbanChatMember(
        { chat_id: SUPERGROUP_ID, user_id: 115000496 },
        {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (bool: boolean) => {
        t.ok(bool === true, 'bool should be true')
        t.end()
      },
      onError(sources, t))
})

test('should get chat with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(getChat({ chat_id: GROUP_ID }, {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (chat: any) => {
        t.ok(chat.id === GROUP_ID)
        t.end()
      },
      onError(sources, t))
})

test('should get chat administrators with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(getChatAdministrators({ chat_id: GROUP_ID }, {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (chatMembers: any[]) => {
        chatMembers.forEach((chatMember: any) => {
          t.ok(chatMember.hasOwnProperty('user'), 'chat member has property user')
          t.ok(chatMember.hasOwnProperty('status'), 'chat member has property status')
        })
        t.end()
      },
      onError(sources, t))
})

test('should get chat members count with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(getChatMembersCount({ chat_id: GROUP_ID }, {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (chatMembersCount: number) => {
        t.ok(typeof chatMembersCount === 'number')
        t.end()
      },
      onError(sources, t))
})

test('should get chat member with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(getChatMember({ chat_id: GROUP_ID, user_id: 39759851 }, {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (chatMember: any) => {
        t.ok(chatMember.hasOwnProperty('user'), 'chat member has property user')
        t.ok(chatMember.hasOwnProperty('status'), 'chat member has property status')
        t.ok(chatMember.user.id === 39759851, 'chat member id equals 39759851')
        t.end()
      },
      onError(sources, t))
})

test.skip('should answer callback query with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN)
  let main = ({ bot }: Sources) => ({
    bot: $.from([
      bot.events('message').map(reply({
        text: 'Test message',
        reply_markup: {inline_keyboard: [
          [{text: '1', callback_data: 'one'}],
          [{text: '2', callback_data: 'two'}]
        ]}
      })),
      bot.events('callback_query')
        .map(x => answerCallbackQuery(
          { text: x.callback_query.data, show_alert: true },
          x))
        .do(() => {
          bot.dispose()
          t.end()
        })
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .subscribe(
      console.log.bind(console),
      onError(sources, t))
})

// Inline mode

test('should edit message text with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1472895308 * 1000 })
  let main = ({ bot }: Sources) => ({
    bot: $.from([
      bot.events('message')
        .do(() => bot.dispose())
        .map(reply('Cycle.js')),
      bot.responses
        .take(1)
        .filter(x => x.text === 'Cycle.js')
        .map(message => editMessageText({ text: 'Cycle Telegram' }, { message }))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .skip(1)
    .subscribe(
      (message: any | boolean) => {
        t.ok(message.text === 'Cycle.js')
        t.end()
      },
      onError(sources, t))
})

test('should edit message caption with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1472895309 * 1000 })
  let main = ({ bot }: Sources) => ({
    bot: $.from([
      bot.events('message')
        .do(() => bot.dispose())
        .map(sendPhoto({
          photo: fs.createReadStream(path.join(FIXTURES_PATH, 'test.jpg')),
          caption: 'Cycle.js'
        })),
      bot.responses
        .take(1)
        .filter(x => x.caption === 'Cycle.js')
        .map(message => editMessageCaption({ caption: 'Cycle Telegram' }, { message }))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .skip(1)
    .subscribe(
      (message: any | boolean) => {
        t.ok(message.caption === 'Cycle.js')
        t.end()
      },
      onError(sources, t))
})

test('should edit message reply markup with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1472895310 * 1000 })
  let main = ({ bot }: Sources) => ({
    bot: $.from([
      bot.events('message')
        .do(() => bot.dispose())
        .map(reply({
          text: 'Message with reply_markup',
          reply_markup: {
            inline_keyboard: [
              [{ text: '1', callback_data: 'one' }],
              [{ text: '2', callback_data: 'two' }],
              [{ text: '3', callback_data: 'three' }]
            ]
          }
        })),
      bot.responses
        .take(1)
        .map(message => editMessageReplyMarkup(
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: '4', callback_data: 'four' }],
                [{ text: '5', callback_data: 'five' }],
                [{ text: '6', callback_data: 'six' }]
              ]
            }
          },
          { message }))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .skip(1)
    .subscribe(
      (message: any | boolean) => {
        t.ok(message.text === 'Message with reply_markup')
        t.end()
      },
      onError(sources, t))
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
  let main = ({ bot }: Sources) => ({
    bot: $.from([
      bot.events('inline_query')
        .do(() => bot.dispose())
        .map(answerInlineQuery(results))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (bool: boolean) => {
        t.ok(bool, 'response should be truthy')
        t.end()
      },
      onError(sources, t))
})

test('should leave chat with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: $.from([
      $.of(leaveChat({ chat_id: GROUP_ID }, {}))
    ])
  })
  let { sources, run } = Cycle(main, { bot: basicDriver })

  run()
  sources.bot.responses
    .take(1)
    .do(() => sources.bot.dispose())
    .subscribe(
      (bool: boolean) => {
        t.ok(bool === true, 'bool should be true')
        t.end()
      },
      onError(sources, t))
})
