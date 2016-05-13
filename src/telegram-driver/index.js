import { makeTelegramDriver } from './telegram-driver'
import { reply, webhook, answerInlineQuery, setWebhook } from './sinks'
import { getEntityFirst, entityIs } from './entities'

export {
  makeTelegramDriver,
  getEntityFirst,
  entityIs,

  reply,
  webhook,
  answerInlineQuery,
  setWebhook
}

export * from '../types'
