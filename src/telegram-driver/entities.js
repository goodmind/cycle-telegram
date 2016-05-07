import { curryN, pipe, view, lensPath, ifElse, isArrayLike, any, propEq, not, isNil, find } from 'ramda'

export let entityIs = (type) => pipe(
    view(lensPath(['message', 'entities'])),
    ifElse(
      isArrayLike,
      any(propEq('type', type)),
      pipe(not, isNil)))

export let getEntityFirst = curryN(2, (type, {message}) => {
  let match = find(propEq('type', type))(message.entities)
  return message.text.substr(match.offset, match.length)
})
