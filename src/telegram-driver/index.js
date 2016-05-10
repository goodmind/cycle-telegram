import { makeTelegramDriver } from './telegram-driver'
import { reply, webhook, answerInlineQuery } from './sinks'
import { getEntityFirst, entityIs } from './entities'

export {
  makeTelegramDriver,
  reply,
  webhook,
  answerInlineQuery,
  getEntityFirst,
  entityIs
}

export * from '../types'
