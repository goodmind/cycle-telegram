import { Request, WebhookResponse } from '../types'
import {
  map, assoc,
  curryN, path,
  defaultTo,
  compose,
  is, isArrayLike
} from 'ramda'
import { defaults } from '../helpers'

export let setWebhook = (options = {}) => Request({
  type: 'sink',
  method: 'setWebhook',
  options
})

export let webhook = (update) => WebhookResponse({
  type: 'webhook',
  update
})

export let broadcast = curryN(2, (options = {}, update) => Request({
  type: 'sink',
  method: 'sendMessage',
  options: defaults({
    chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
    text: defaultTo('Null-catch: no text provided'),
    reply_markup: JSON.stringify
  }, options)
}))

export let reply = curryN(2, (options = {}, update) => Request({
  type: 'sink',
  method: 'sendMessage',
  options: defaults({
    chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
    reply_to_message_id: defaultTo(path(['message', 'message_id'], update)),
    text: defaultTo('Null-catch: no text provided'),
    reply_markup: JSON.stringify
  }, is(String, options) ? {text: options} : options)
}))

export let answerInlineQuery = curryN(2, (options = {}, update) => {
  let updateResults = (results) => results[0].id ? results : map(
    answer => assoc('id', Math.random().toString(36).substring(2), answer),
    results || [])

  return Request({
    type: 'sink',
    method: 'answerInlineQuery',
    options: defaults({
      inline_query_id: defaultTo(path(['inline_query', 'id'], update)),
      results: compose(JSON.stringify, updateResults)
    }, isArrayLike(options) ? {results: options} : options)
  })
})

export let forwardMessage = curryN(2, ({ chat_id, from_chat_id, disable_notification = null, message_id,  } = {}, update) => {
  let options = {
    chat_id,
    from_chat_id,
    disable_notification,
    message_id
  }
  return Request({
    type: 'sink',
    method: 'forwardMessage',
    options
  })
})

export let sendPhoto = curryN(2, ({ chat_id, photo, caption = null, disable_notification = null, reply_to_message_id = null, reply_markup = null,  } = {}, update) => {
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
    method: 'sendPhoto',
    options
  })
})

export let sendAudio = curryN(2, ({ chat_id, audio, duration = null, performer = null, title = null, disable_notification = null, reply_to_message_id = null, reply_markup = null,  } = {}, update) => {
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
    method: 'sendAudio',
    options
  })
})

export let sendDocument = curryN(2, ({ chat_id, document, caption = null, disable_notification = null, reply_to_message_id = null, reply_markup = null,  } = {}, update) => {
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
    method: 'sendDocument',
    options
  })
})

export let sendSticker = curryN(2, ({ chat_id, sticker, disable_notification = null, reply_to_message_id = null, reply_markup = null,  } = {}, update) => {
  let options = {
    chat_id,
    sticker,
    disable_notification,
    reply_to_message_id,
    reply_markup
  }
  return Request({
    type: 'sink',
    method: 'sendSticker',
    options
  })
})

export let sendVideo = curryN(2, ({ chat_id, video, duration = null, width = null, height = null, caption = null, disable_notification = null, reply_to_message_id = null, reply_markup = null,  } = {}, update) => {
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
    method: 'sendVideo',
    options
  })
})

export let sendVoice = curryN(2, ({ chat_id, voice, duration = null, disable_notification = null, reply_to_message_id = null, reply_markup = null,  } = {}, update) => {
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
    method: 'sendVoice',
    options
  })
})

export let sendLocation = curryN(2, ({ chat_id, latitude, longitude, disable_notification = null, reply_to_message_id = null, reply_markup = null,  } = {}, update) => {
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
    options
  })
})

export let sendVenue = curryN(2, ({ chat_id, latitude, longitude, title, address, foursquare_id = null, disable_notification = null, reply_to_message_id = null, reply_markup = null,  } = {}, update) => {
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
    options
  })
})

export let sendContact = curryN(2, ({ chat_id, phone_number, first_name, last_name = null, disable_notification = null, reply_to_message_id = null, reply_markup = null,  } = {}, update) => {
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
    options
  })
})

export let getUserProfilePhotos = curryN(2, ({ user_id, offset = null, limit = null,  } = {}, update) => {
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

export let getFile = curryN(2, ({ file_id,  } = {}, update) => {
  let options = {
    file_id
  }
  return Request({
    type: 'sink',
    method: 'getFile',
    options
  })
})

export let leaveChat = curryN(2, ({ chat_id,  } = {}, update) => {
  let options = {
    chat_id
  }
  return Request({
    type: 'sink',
    method: 'leaveChat',
    options
  })
})

export let unbanChatMember = curryN(2, ({ chat_id, user_id,  } = {}, update) => {
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

export let getChat = curryN(2, ({ chat_id,  } = {}, update) => {
  let options = {
    chat_id
  }
  return Request({
    type: 'sink',
    method: 'getChat',
    options
  })
})

export let getChatAdministrators = curryN(2, ({ chat_id,  } = {}, update) => {
  let options = {
    chat_id
  }
  return Request({
    type: 'sink',
    method: 'getChatAdministrators',
    options
  })
})

export let getChatMembersCount = curryN(2, ({ chat_id,  } = {}, update) => {
  let options = {
    chat_id
  }
  return Request({
    type: 'sink',
    method: 'getChatMembersCount',
    options
  })
})

export let getChatMember = curryN(2, ({ chat_id, user_id,  } = {}, update) => {
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

export let answerCallbackQuery = curryN(2, ({ callback_query_id, text = null, show_alert = null,  } = {}, update) => {
  let options = {
    callback_query_id,
    text,
    show_alert
  }
  return Request({
    type: 'sink',
    method: 'answerCallbackQuery',
    options
  })
})

export let editMessageText = curryN(2, ({ text, parse_mode = null, disable_web_page_preview = null, reply_markup = null,  } = {}, update) => {
  let options = {
    text,
    parse_mode,
    disable_web_page_preview,
    reply_markup
  }
  return Request({
    type: 'sink',
    method: 'editMessageText',
    options
  })
})

export let editMessageCaption = curryN(2, ({ caption = null, reply_markup = null,  } = {}, update) => {
  let options = {
    caption,
    reply_markup
  }
  return Request({
    type: 'sink',
    method: 'editMessageCaption',
    options
  })
})

export let editMessageReplyMarkup = curryN(2, ({ reply_markup = null,  } = {}, update) => {
  let options = {
    reply_markup
  }
  return Request({
    type: 'sink',
    method: 'editMessageReplyMarkup',
    options
  })
})
