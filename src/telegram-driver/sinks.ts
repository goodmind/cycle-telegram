import { Update } from '../interfaces'
import { Request, WebhookResponse } from '../runtime-types'
import { TcombRequest } from '../runtime-types'
import {
  map, assoc,
  curryN, path,
  defaultTo, keys,
  pickAll, chain,
  evolve, compose,
  is, isArrayLike
} from 'ramda'

let defaults = curryN(2, <T extends { [index: string ]: (value: any) => any }, U>(
    transformations: T,
    obj: U
  ): () => T & U => compose<any, any, any, () => T & U>(
    evolve(transformations),
    pickAll)(
      chain(keys, [transformations, obj]),
      obj))

export let broadcast = curryN(2, (options = {}, update: Update): TcombRequest => Request({
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

export let reply = curryN(2, (options = {}, update: Update) => Request({
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

export let answerInlineQuery = curryN(2, (options = {}, update: Update) => {
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

export let answerCallbackQuery =
  curryN(2, (options = {}, update: Update) => Request({
    type: 'sink',
    method: 'answerCallbackQuery',
    options: defaults({
      callback_query_id: defaultTo(path(['callback_query', 'id'], update))
    })
  }))

export let setWebhook =
  (options = {}) => Request({
    type: 'sink',
    method: 'setWebhook',
    options
  })

export let webhook =
  (update: Update) => WebhookResponse({
    type: 'webhook',
    update
  })
