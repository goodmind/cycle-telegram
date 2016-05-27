import { Request, WebhookResponse } from '../types'
import { merge, map, assoc, curryN, path, defaultTo, keys, difference, pickAll, uniq, concat } from 'ramda'
import _curry2 from 'ramda/src/internal/_curry2'

let evolve = _curry2(function evolve (transformations, object) {
  object = pickAll(
    uniq(concat(keys(transformations), keys(object))),
    object)
  console.log(transformations, object)
  var result = {}
  var transformation, key, type
  for (key in object) {
    transformation = transformations[key]
    type = typeof transformation
    result[key] = type === 'function' ? transformation(object[key])
      : type === 'object' ? evolve(transformations[key], object[key])
      : object[key]
  }
  return result
})

export let broadcast = curryN(2, (options = {}, update) => Request({
  type: 'sink',
  method: 'sendMessage',
  options: evolve({
    chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
    text: defaultTo('Null-catch: no text provided'),
    reply_markup: JSON.stringify
  }, options)
}))

export let reply = curryN(2, (options = {}, update) => Request({
  type: 'sink',
  method: 'sendMessage',
  options: evolve({
    chat_id: defaultTo(path(['message', 'chat', 'id'], update)),
    reply_to_message_id: defaultTo(path(['message', 'message_id'], update)),
    text: defaultTo('Null-catch: no text provided'),
    reply_markup: JSON.stringify
  }, options)
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
    options: evolve({
      inline_query_id: defaultTo(path(['inline_query', 'id'], update)),
      results: JSON.stringify
    }, options)
  })
})

export let setWebhook = (options = {}) => Request({
  type: 'sink',
  method: 'setWebhook',
  options: merge(options, {})
})

export let webhook = (update) => WebhookResponse({
  type: 'webhook',
  update
})
