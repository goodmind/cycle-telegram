import { Request, WebhookResponse } from '../runtime-types'
/* tslint:disable */
import { TcombRequest, TcombWebhookResponse, TcombUpdate } from '../runtime-types/types'
/* tslint:enable */
import {
  map, assoc,
  curry, path,
  defaultTo, compose,
  is, isArrayLike,
  // tslint:disable-next-line
  CurriedFunction2
} from 'ramda'
import { defaults } from '../helpers'

export interface SinkPayload { [s: string]: any }
type Update = TcombUpdate | {}

const curryN = <T1, T2, R>(n: number, func: (a: T1, b: T2) => R) => curry(func)

export let webhook = (update: TcombUpdate) => WebhookResponse({
  type: 'webhook',
  update
})

// TODO: stricter types
export let setWebhook = (options: any = {}) => Request({
  type: 'sink',
  method: 'setWebhook',
  options
})

// TODO: stricter types
export let getWebhookInfo = (options: any = {}) => Request({
  type: 'sink',
  method: 'getWebhookInfo',
  options
})

// TODO: stricter types
export let getMe = (options: any = {}) => Request({
  type: 'sink',
  method: 'getMe',
  options
})

export let broadcast = curryN(2, (options: SinkPayload = {}, update: Update) => Request({
  type: 'sink',
  method: 'sendMessage',
  options: defaults(
    {
      chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
      text: defaultTo('Null-catch: no text provided'),
      reply_markup: JSON.stringify
    },
    options)
}))

export let reply = curryN(2, (options: SinkPayload | string = {}, update: Update) => Request({
  type: 'sink',
  method: 'sendMessage',
  options: defaults(
    {
      chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
      reply_to_message_id: defaultTo(path(['message', 'message_id'], update)),
      text: defaultTo('Null-catch: no text provided'),
      reply_markup: JSON.stringify
    },
    is(String, options) ? {text: options} : options)
}))

export let forwardMessage = curryN(2, (options: SinkPayload | number = {}, update: Update) => Request({
  type: 'sink',
  method: 'forwardMessage',
  options: defaults(
    {
      from_chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
      message_id: defaultTo(path(['message', 'message_id'], update))
    },
    is(Number, options) ? {chat_id: options} : options)
}))

/* tslint:disable:variable-name */

export let sendPhoto = curryN(2, ({
  chat_id,
  photo,
  caption = null,
  disable_notification = null,
  reply_to_message_id = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    photo,
    caption,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    multipart: true,
    method: 'sendPhoto',
    options: defaults(
      {
        chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
        reply_markup: JSON.stringify
      },
      options)
  })
})

export let sendAudio = curryN(2, ({
  chat_id,
  audio,
  duration = null,
  performer = null,
  title = null,
  disable_notification = null,
  reply_to_message_id = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    audio,
    duration,
    performer,
    title,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    multipart: true,
    method: 'sendAudio',
    options: defaults({ reply_markup: JSON.stringify }, options)
  })
})

export let sendDocument = curryN(2, ({
  chat_id,
  document,
  caption = null,
  disable_notification = null,
  reply_to_message_id = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    document,
    caption,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    multipart: true,
    method: 'sendDocument',
    options: defaults({ reply_markup: JSON.stringify }, options)
  })
})

export let sendSticker = curryN(2, ({
  chat_id,
  sticker,
  disable_notification = null,
  reply_to_message_id = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    sticker,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    multipart: true,
    method: 'sendSticker',
    options: defaults({ reply_markup: JSON.stringify }, options)
  })
})

export let sendVideo = curryN(2, ({
  chat_id,
  video,
  duration = null,
  width = null,
  height = null,
  caption = null,
  disable_notification = null,
  reply_to_message_id = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    video,
    duration,
    width,
    height,
    caption,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    multipart: true,
    method: 'sendVideo',
    options: defaults({ reply_markup: JSON.stringify }, options)
  })
})

export let sendVoice = curryN(2, ({
  chat_id,
  voice,
  duration = null,
  disable_notification = null,
  reply_to_message_id = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    voice,
    duration,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    multipart: true,
    method: 'sendVoice',
    options: defaults({ reply_markup: JSON.stringify }, options)
  })
})

export let sendLocation = curryN(2, ({
  chat_id,
  latitude,
  longitude,
  disable_notification = null,
  reply_to_message_id = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    latitude,
    longitude,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    method: 'sendLocation',
    options: defaults({ reply_markup: JSON.stringify }, options)
  })
})

export let sendVenue = curryN(2, ({
  chat_id,
  latitude,
  longitude,
  title,
  address,
  foursquare_id = null,
  disable_notification = null,
  reply_to_message_id = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    latitude,
    longitude,
    title,
    address,
    foursquare_id,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    method: 'sendVenue',
    options: defaults({ reply_markup: JSON.stringify }, options)
  })
})

export let sendContact = curryN(2, ({
  chat_id,
  phone_number,
  first_name,
  last_name = null,
  disable_notification = null,
  reply_to_message_id = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    phone_number,
    first_name,
    last_name,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    method: 'sendContact',
    options: defaults({ reply_markup: JSON.stringify }, options)
  })
})

export let sendChatAction = curryN(2, ({ chat_id, action }: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    action
  }
  return Request({
    type: 'sink',
    method: 'sendChatAction',
    options
  })
})

export let getUserProfilePhotos = curryN(2, ({
  user_id,
  offset = null,
  limit = null
}: SinkPayload, update: Update) => {
  let options = {
    user_id,
    offset,
    limit
  }
  return Request({
    type: 'sink',
    method: 'getUserProfilePhotos',
    options
  })
})

export let getFile = curryN(2, ({ file_id }: SinkPayload, update: Update) => {
  let options = {
    file_id
  }
  return Request({
    type: 'sink',
    method: 'getFile',
    options
  })
})

export let kickChatMember = curryN(2, ({ chat_id, user_id }: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    user_id
  }
  return Request({
    type: 'sink',
    method: 'kickChatMember',
    options
  })
})

export let leaveChat = curryN(2, ({ chat_id }: SinkPayload, update: Update) => {
  let options = {
    chat_id
  }
  return Request({
    type: 'sink',
    method: 'leaveChat',
    options
  })
})

export let unbanChatMember = curryN(2, ({ chat_id, user_id }: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    user_id
  }
  return Request({
    type: 'sink',
    method: 'unbanChatMember',
    options
  })
})

export let getChat = curryN(2, ({ chat_id }: SinkPayload, update: Update) => {
  let options = {
    chat_id
  }
  return Request({
    type: 'sink',
    method: 'getChat',
    options
  })
})

export let getChatAdministrators = curryN(2, ({ chat_id }: SinkPayload, update: Update) => {
  let options = {
    chat_id
  }
  return Request({
    type: 'sink',
    method: 'getChatAdministrators',
    options
  })
})

export let getChatMembersCount = curryN(2, ({ chat_id }: SinkPayload, update: Update) => {
  let options = {
    chat_id
  }
  return Request({
    type: 'sink',
    method: 'getChatMembersCount',
    options
  })
})

export let getChatMember = curryN(2, ({ chat_id, user_id }: SinkPayload, update: Update) => {
  let options = {
    chat_id,
    user_id
  }
  return Request({
    type: 'sink',
    method: 'getChatMember',
    options
  })
})

// TODO: stricter types
export let answerCallbackQuery = curryN(2, (options: any = {}, update: Update) => Request({
  type: 'sink',
  method: 'answerCallbackQuery',
  options: defaults(
    { callback_query_id: defaultTo(path(['callback_query', 'id'], update)) },
    options)
}))

// TODO: stricter types
export let editMessageText = curryN(2, (options: any = {}, update: Update) => Request({
  type: 'sink',
  method: 'editMessageText',
  options: defaults(
    {
      chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
      message_id: defaultTo(path(['message', 'message_id'], update)),
      text: defaultTo('Null-catch: no text provided'),
      reply_markup: JSON.stringify
    },
    options)
}))

export let editMessageCaption = curryN(2, ({
  caption = null,
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    caption,
    reply_markup
  }
  return Request({
    type: 'sink',
    method: 'editMessageCaption',
    options: defaults(
      {
        chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
        message_id: defaultTo(path(['message', 'message_id'], update)),
        reply_markup: JSON.stringify
      },
      options)
  })
})

export let editMessageReplyMarkup = curryN(2, ({
  reply_markup = {}
}: SinkPayload, update: Update) => {
  let options = {
    reply_markup
  }
  return Request({
    type: 'sink',
    method: 'editMessageReplyMarkup',
    options: defaults(
      {
        chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
        message_id: defaultTo(path(['message', 'message_id'], update)),
        reply_markup: JSON.stringify
      },
      options)
  })
})

// TODO: stricter types
export let answerInlineQuery = curryN(2, (options: any = {}, update: Update) => {
  let updateResults = (results: any[]) => results[0].id ? results : map(
    answer => assoc('id', Math.random().toString(36).substring(2), answer),
    results || [])

  return Request({
    type: 'sink',
    method: 'answerInlineQuery',
    options: defaults(
      {
        inline_query_id: defaultTo(path(['inline_query', 'id'], update)),
        results: compose(JSON.stringify, updateResults)
      },
      isArrayLike(options) ? {results: options} : options)
  })
})

export let sendGame = curryN(2, (options: SinkPayload = {}, update: Update) => {
  return Request({
    type: 'sink',
    method: 'sendGame',
    options: defaults(
      {
        chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
        reply_markup: JSON.stringify
      },
      options)
  })
})

export let setGameScore = curryN(2, (options: SinkPayload = {}, update: Update) => {
  return Request({
    type: 'sink',
    method: 'setGameScore',
    options: defaults(
      {
        user_id: defaultTo(path(['message', 'from', 'id'], update)),
        chat_id: defaultTo(path(['message', 'chat', 'id'], update))
      },
      options)
  })
})

export let getGameHighScores = curryN(2, (options: SinkPayload = {}, update: Update) => {
  return Request({
    type: 'sink',
    method: 'getGameHighScores',
    options: defaults(
      {
        user_id: defaultTo(path(['message', 'from', 'id'], update)),
        chat_id: defaultTo(path(['message', 'chat', 'id'], update))
      },
      options)
  })
})
