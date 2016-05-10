import { Request, WebhookResponse } from '../types'
import { merge, map, assoc, curryN } from 'ramda'

export let reply = curryN(2, (options = {}, update) => Request({
  type: 'sink',
  method: 'sendMessage',
  options: merge(options, {
    chat_id: update.message.chat.id,
    reply_to_message_id: update.message.message_id,
    text: options.text || 'Null-catch: no text provided',
    reply_markup: JSON.stringify(options.reply_markup)
  })
}))

export let answerInlineQuery = curryN(2, (options = {}, update) => {
  let results = options.results[0].id ? options.results
    : map(answer =>
        assoc('id', Math.random().toString(36).substring(2), answer),
        options.results || []
      )

  return Request({
    type: 'sink',
    method: 'answerInlineQuery',
    options: merge(options, {
      inline_query_id: update.inline_query.id,
      results: JSON.stringify(results)
    })
  })
})

export let webhook = (update) => WebhookResponse({
  type: 'webhook',
  update
})
