import { makeTelegramDriver } from './telegram-driver';
import { reply, answerInlineQuery } from './sinks';
import { getEntityFirst, entityIs } from './entities';

export {
  makeTelegramDriver,
  reply,
  answerInlineQuery,
  getEntityFirst,
  entityIs
}

export * from './types/types';
