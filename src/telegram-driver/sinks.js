import { Request } from './types/types'
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
  let results

  if (!options.results[0].id) {
    results = map(answer => assoc('id', Math.random().toString(36).substring(2), answer), options.results)
  } else {
    results = options.results || []
  }

  console.log(options, update)

  return Request({
    type: 'sink',
    method: 'answerInlineQuery',
    options: merge(options, {
      inline_query_id: update.inline_query.id,
      results: JSON.stringify(results)
    })
  })
})
