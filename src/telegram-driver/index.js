import { makeTelegramDriver } from './telegram-driver'
import { reply, webhook, answerInlineQuery, setWebhook } from './sinks'
import { getEntityFirst, getEntityFirstValue, entityIs } from './entities'

export {
  makeTelegramDriver,
  getEntityFirst,
  getEntityFirstValue,
  entityIs,

  reply,
  webhook,
  answerInlineQuery,
  setWebhook
}

export * from '../types'
