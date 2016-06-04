import { Update } from '../interfaces'
import {
  curryN,
  pipe,
  view,
  lensPath,
  ifElse,
  isArrayLike,
  any,
  propEq,
  not,
  isNil,
  find,
  defaultTo
} from 'ramda'

export let entityIs = curryN(2,
  (type: string, update: Update): boolean => pipe(
    view(lensPath(['message', 'entities'])),
    ifElse(
      isArrayLike,
      any(propEq('type', type)),
      pipe(not, isNil)))(update))

export let getEntityFirst = curryN(2,
  (type: string, update: Update) => pipe(
    view(lensPath(['message', 'entities'])),
    defaultTo([]),
    find(propEq('type', type)))(update))

export let getEntityFirstValue = curryN(2,
  (type: string, update: Update) => {
    let match = getEntityFirst(type, update)
    return update.message.text.substr(match.offset, match.length)
  })
