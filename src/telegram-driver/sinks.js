import { Request, WebhookResponse } from '../types'
import {
  merge, map, assoc,
  curryN, path,
  defaultTo, keys,
  pickAll, chain,
  evolve, compose
} from 'ramda'

let defaults = curryN(2, (transformations, obj) => compose(
  evolve(transformations),
  pickAll)(
    chain(keys, [transformations, obj]),
    obj))

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
  }, options)
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
