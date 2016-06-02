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
  path,
  defaultTo
} from 'ramda'

export let entityIs = (type) => pipe(
    view(lensPath(['message', 'entities'])),
    ifElse(
      isArrayLike,
      any(propEq('type', type)),
      pipe(not, isNil)))

export let getEntityFirst = curryN(2,
  (type, update) =>
    find(
      propEq('type', type),
      defaultTo([])(path(['message', 'entities'], update))))

export let getEntityFirstValue = curryN(2, (type, update) => {
  let match = getEntityFirst(type, update)
  return update.message.text.substr(match.offset, match.length)
})
