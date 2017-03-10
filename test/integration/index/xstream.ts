/// <reference path="../../../xstream-typings.d.ts" />
/* tslint:disable */
import {
  makeTelegramDriver,
  getWebhookInfo,
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
  sendGame,
  setGameScore,
  getGameHighScores,
  DriverExecution
} from '../../../lib/index'
import {
  Message,
  TcombMessage,
  WebhookInfo,
  TcombWebhookInfo,
  User,
  TcombUser,
  Chat,
  TcombChat,
  ChatMember,
  TcombChatMember,
  Game,
  TcombGame,
  GameHighScore,
  TcombGameHighScore
} from '../../../lib/index'
import {
  UserProfilePhotos,
  TcombUserProfilePhotos,
  File,
  TcombFile
} from '../../../lib/runtime-types/multimedia-types'
/* tslint:enable */
import { OkTakeFn, OkDropFn, OnErrorFn } from '../../interfaces'

import * as path from 'path'
import * as tape from 'tape'
import * as tapeNock from 'tape-nock'
import * as fs from 'fs'
import * as tc from 'tcomb'

import { setup as Cycle } from '@cycle/run'
import xs from 'xstream'
import { prop, is } from 'ramda'

interface Sources {
  bot: DriverExecution
}

const isRecord = process.env['NOCK_BACK_MODE'] === 'record'
const FIXTURES_WRITE_PATH = path.join(__dirname, '..', isRecord ? 'record-fixtures' : 'fixtures')
const FIXTURES_PATH = path.join(__dirname, '..', 'fixtures')
const test = tapeNock(tape, {
  fixtures: FIXTURES_WRITE_PATH,
  mode: isRecord ? 'record' : 'lockdown'
})
const ACCESS_TOKEN = isRecord ? process.env['ACCESS_TOKEN'] : '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
const GROUP_ID = -175523088
const SUPERGROUP_ID = -1001086044029

if (isRecord) {
  console.log('Recording mode')
}

const onError: OnErrorFn<Sources> = (sources, t) => (err) => {
  sources.bot.dispose()
  console.error('test error: ', err)
  t.fail(err)
  t.end()
}
const okTake: OkTakeFn<Sources> = <T>(t, sources, next, error = onError(sources, t)) => {
  sources.bot.responses
    .take(1)
    .addListener({
      next (m: T) {
        sources.bot.dispose()
        next(m)
      },
      error,
      complete: () => undefined
    })
}
const okDrop: OkDropFn<Sources> = <T>(t, sources, next, error = onError(sources, t)) => {
  sources.bot.responses
    .drop(1)
    .addListener({
      next (m: T) {
        sources.bot.dispose()
        next(m)
      },
      error,
      complete: () => undefined
    })
}

test('should get me with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(getMe())
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombUser>(t, sources, (user) => {
    t.ok(User.is(User(user)), 'user satisfies typecheck')
    t.ok(user.hasOwnProperty('id'), 'user object has property id')
    t.ok(user.hasOwnProperty('first_name'), 'user object has property first_name')
    t.ok(user.hasOwnProperty('username'), 'user object has property username')
    t.end()
  })
})

test('should get webhook info with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(getWebhookInfo())
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombWebhookInfo>(t, sources, (info) => {
    t.ok(WebhookInfo.is(WebhookInfo(info)), 'webhook info satisfies typecheck')
    t.end()
  })
})

test('should reply to channel posts with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1480790772000 })
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      bot.events('channel_post').map(reply('Cycle.js'))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.equal(message.text, 'Cycle.js', 'message text should be equal to `Cycle.js`')
    t.end()
  })
})

test('should reply to edited channel posts with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1480844725000 })
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      bot.events('edited_channel_post').map(reply('Cycle.js'))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.equal(message.text, 'Cycle.js', 'message text should be equal to `Cycle.js`')
    t.end()
  })
})

test('should reply to edited messages with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1488976505000 })
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      bot.events('edited_message').map(reply('Cycle.js'))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.equal(message.text, 'Cycle.js', 'message text should be equal to `Cycle.js`')
    t.end()
  })
})

test('should reply to messages with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1464342407440 })
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      bot.events('message').map(reply('Cycle.js'))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.equal(message.text, 'Cycle.js', 'message text should be equal to `Cycle.js`')
    t.end()
  })
})

test('should forward message with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(forwardMessage(
        { chat_id: GROUP_ID, from_chat_id: GROUP_ID, message_id: 4515 },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.ok(is(Object, message), 'message is object')
    t.end()
  })
})

test('should send photo with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendPhoto(
        { chat_id: GROUP_ID, photo: fs.createReadStream(path.join(FIXTURES_PATH, 'test.jpg')) },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.ok(message.hasOwnProperty('photo'), 'message has property photo')
    t.end()
  })
})

test('should send audio with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendAudio(
        {
          chat_id: GROUP_ID,
          audio: fs.createReadStream(path.join(FIXTURES_PATH, 'test.ogg')),
          performer: 'Skiessi',
          title: 'RandomProjectNumber14253'
        },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.equal(message.voice.mime_type, 'audio/ogg', 'mime type should be audio/ogg')
    t.end()
  })
})

test.skip('should send document with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendDocument(
        { chat_id: GROUP_ID, document: fs.createReadStream(path.join(FIXTURES_PATH, 'test.jpg')) },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.equal(message.document.file_name, 'test.jpg', 'file name should be test.jpg')
    t.end()
  })
})

test.skip('should send sticker with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendSticker(
        { chat_id: GROUP_ID, sticker: '' },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    console.log(message)
    t.end()
  })
})

test.skip('should send video with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendVideo(
        { chat_id: GROUP_ID, video: '' },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    console.log(message)
    t.end()
  })
})

test.skip('should send voice with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendVoice(
        { chat_id: GROUP_ID, voice: '' },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    console.log(message)
    t.end()
  })
})

test('should send location with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendLocation(
        { chat_id: GROUP_ID, latitude: 55.751244, longitude: 37.618423 },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.ok(message.hasOwnProperty('location'), 'message has property location')
    t.end()
  })
})

test('should send venue with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendVenue(
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
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.ok(message.hasOwnProperty('venue'), 'message has property venue')
    t.equal(message.venue.title, 'Red Square', 'venue title should be Red Square')
    t.equal(message.venue.address, 'Moscow, Russia', 'venue title should be Moscow, Russia')
    t.end()
  })
})

test('should send contact with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendContact(
        { chat_id: GROUP_ID, phone_number: '+42470', first_name: 'Telegram' },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.ok(message.hasOwnProperty('contact'), 'message has property contact')
    t.equal(message.contact.phone_number, '+42470', 'contact phone number should be +42470')
    t.equal(message.contact.first_name, 'Telegram', 'contact first name should be Telegram')
    t.end()
  })
})

test('should send chat action with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendChatAction(
        { chat_id: GROUP_ID, action: 'typing' },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<boolean>(t, sources, (bool) => {
    t.equal(bool, true, 'bool should be true')
    t.end()
  })
})

test('should get user profile photos with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(getUserProfilePhotos(
        { user_id: 39759851 },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombUserProfilePhotos>(t, sources, (userProfilePhotos) => {
    t.ok(UserProfilePhotos.is(UserProfilePhotos(userProfilePhotos)), 'user profile photos satisfies typecheck')
    t.ok(userProfilePhotos.hasOwnProperty('total_count'), 'user profile photos has property total_count')
    t.equal(typeof userProfilePhotos.total_count, 'number', 'total_count should be number')
    t.ok(userProfilePhotos.hasOwnProperty('photos'), 'user profile photos has property photos')
    t.end()
  })
})

test('should get file with basic driver', t => {
  const FILE_ID = 'AgADAgADx6cxGxnDdgxSdsYg3HzwDz8McQ0ABDBxKl75YR5CapIBAAEC'
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(getFile(
        { file_id: FILE_ID },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombFile>(t, sources, (file) => {
    t.ok(File.is(File(file)), 'file satisfies typecheck')
    t.equal(file.file_id, FILE_ID, 'file ids should be equal')
    t.end()
  })
})

test('should kick chat member with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(kickChatMember(
        { chat_id: SUPERGROUP_ID, user_id: 115000496 },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<boolean>(t, sources, (bool) => {
    t.equal(bool, true, 'bool should be true')
    t.end()
  })
})

test('should unban chat member with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(unbanChatMember(
        { chat_id: SUPERGROUP_ID, user_id: 115000496 },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<boolean>(t, sources, (bool) => {
    t.equal(bool, true, 'bool should be true')
    t.end()
  })
})

test('should get chat with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(getChat({ chat_id: GROUP_ID }, {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombChat>(t, sources, (chat) => {
    t.ok(Chat.is(Chat(chat)), 'chat satisfies typecheck')
    t.equal(chat.id, GROUP_ID)
    t.end()
  })
})

test('should get chat administrators with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(getChatAdministrators({ chat_id: GROUP_ID }, {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombChatMember[]>(t, sources, (chatMembers) => {
    t.ok(tc.list(ChatMember).is(tc.list(ChatMember)(chatMembers)), 'chat members satisfies typecheck')
    chatMembers.forEach((chatMember: any) => {
      t.ok(chatMember.hasOwnProperty('user'), 'chat member has property user')
      t.ok(chatMember.hasOwnProperty('status'), 'chat member has property status')
    })
    t.end()
  })
})

test('should get chat members count with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(getChatMembersCount({ chat_id: GROUP_ID }, {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<number>(t, sources, (chatMembersCount) => {
    t.equal(typeof chatMembersCount, 'number')
    t.end()
  })
})

test('should get chat member with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(getChatMember({ chat_id: GROUP_ID, user_id: 39759851 }, {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombChatMember>(t, sources, (chatMember) => {
    t.ok(ChatMember.is(ChatMember(chatMember)), 'chat member satisfies typecheck')
    t.ok(chatMember.hasOwnProperty('user'), 'chat member has property user')
    t.ok(chatMember.hasOwnProperty('status'), 'chat member has property status')
    t.equal(chatMember.user.id, 39759851, 'chat member id equals 39759851')
    t.end()
  })
})

test.skip('should answer callback query with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN)
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      bot.events('message').map(reply({
        text: 'Test message',
        reply_markup: {
          inline_keyboard: [
            [{ text: '1', callback_data: 'one' }],
            [{ text: '2', callback_data: 'two' }]
          ]
        }
      })),
      bot.events('callback_query')
        .map(x => answerCallbackQuery(
          { text: x.callback_query.data, show_alert: true },
          x))
        .debug(() => {
          bot.dispose()
          t.end()
        })
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake(t, sources, console.log.bind(console))
})

// Inline mode

test('should edit message text with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1472895308 * 1000 })
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      bot.events('message')
        .debug(() => bot.dispose())
        .map(reply('Cycle.js')),
      bot.responses
        .take(1)
        .filter(x => x.text === 'Cycle.js')
        .map(message => editMessageText({ text: 'Cycle Telegram' }, { message }))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okDrop<TcombMessage | boolean>(t, sources, (message) => {
    if (typeof message !== 'boolean') {
      t.ok(Message.is(Message(message)), 'message satisfies typecheck')
      t.equal(message.text, 'Cycle.js')
    }
    t.end()
  })
})

test('should edit message caption with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1472895309 * 1000 })
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      bot.events('message')
        .debug(() => bot.dispose())
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
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okDrop<TcombMessage | boolean>(t, sources, (message) => {
    if (typeof message !== 'boolean') {
      t.ok(Message.is(Message(message)), 'message satisfies typecheck')
      t.equal(message.caption, 'Cycle.js')
    }
    t.end()
  })
})

test('should edit message reply markup with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1472895310 * 1000 })
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      bot.events('message')
        .debug(() => bot.dispose())
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
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okDrop<TcombMessage | boolean>(t, sources, (message) => {
    if (typeof message !== 'boolean') {
      t.ok(Message.is(Message(message)), 'message satisfies typecheck')
      t.equal(message.text, 'Message with reply_markup')
    }
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
        message_text: 'A functional and reactive JavaScript framework for cleaner code'
      },
      id: '2o3aajndy0all3di'
    }
  ]
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      bot.events('inline_query')
        .debug(() => bot.dispose())
        .map(answerInlineQuery(results))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<boolean>(t, sources, (bool) => {
    t.ok(bool, 'response should be truthy')
    t.end()
  })
})

test('should leave chat with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(leaveChat({ chat_id: GROUP_ID }, {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<boolean>(t, sources, (bool) => {
    t.equal(bool, true, 'bool should be true')
    t.end()
  })
})

// Games

test('should send game with basic driver', t => {
  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, { skipUpdates: true })
  let main = () => ({
    bot: xs.from([
      xs.of(sendGame(
        { chat_id: GROUP_ID,
          game_short_name: 'test' },
        {}))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okTake<TcombMessage>(t, sources, (message) => {
    t.ok(Message.is(Message(message)), 'message satisfies typecheck')
    t.end()
  })
})

test('should set game score with basic driver', t => {
  interface MessageUserScore {
    score: TcombGameHighScore
    user: TcombUser
    message: TcombMessage
  }

  interface MessageUser {
    user: TcombUser
    message: TcombMessage
  }

  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1477232741000 })
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      xs.of(sendGame(
        { chat_id: GROUP_ID,
          game_short_name: 'test' },
        {})),

      xs.combine(
        bot.events('message')
          .map<TcombUser>(x => x.message.from)
          .debug(() => bot.dispose()),
        bot.responses.take(1))
        .map(([user, message]) => ({ message, user }))
        .map(({ message, user }) =>
          getGameHighScores(
            { user_id: user.id, message_id: message.message_id },
            { message })),

      xs.combine(
        xs.combine(
          bot.responses
            .take(1),
          bot.events('message')
            .debug(() => bot.dispose())
            .map(x => x.message.from)),
        bot.responses
          .drop(1)
          .filter(Array.isArray)
          .map(xs.from)
          .flatten())
        .map(([[message, user], score]) => ({ message, user, score }))
        .filter(({user, score}) => user.id === score.user.id)
        .map(({ score: { score }, user, message }) =>
          setGameScore(
            { score: score + 1, user_id: user.id, message_id: message.message_id },
            { message })),

      bot.responses
        .drop(1)
        .filter(prop('game'))
        .map(x => x.game)
        .debug((game: TcombGame) => {
          bot.dispose()
          t.ok(Game.is(Game(game)), 'game satisfies typecheck')
          t.end()
        })
    ])
  })
  let { run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
})

test('should get game high scores with basic driver', t => {
  interface MessageUser {
    user: TcombUser
    message: TcombMessage
  }

  let basicDriver = makeTelegramDriver(ACCESS_TOKEN, isRecord ? {} : { startDate: 1477232741000 })
  let main = ({ bot }: Sources) => ({
    bot: xs.from([
      xs.of(sendGame(
        { chat_id: GROUP_ID,
          game_short_name: 'test' },
        {})),

      xs.combine(
        bot.events('message')
          .map<TcombUser>(x => x.message.from)
          .debug(() => bot.dispose()),
        bot.responses.take(1))
        .map(([user, message]) => ({ message, user }))
        .map(({ message, user }) =>
          getGameHighScores(
            { user_id: user.id, message_id: message.message_id },
            { message }))
    ])
  })
  let { sources, run } = Cycle<Sources, any>(main, { bot: basicDriver })

  run()
  okDrop<TcombGameHighScore[]>(t, sources, (gameHighScores) => {
    t.ok(tc.list(GameHighScore).is(tc.list(GameHighScore)(gameHighScores)), 'game high scores satisfies typecheck')
    t.end()
  })
})
