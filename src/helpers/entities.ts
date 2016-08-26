import {
  curryN, pipe, path,
  useWith, any, propEq,
  defaultTo, find
} from 'ramda'

export let entityIs = useWith(
  any, [
    propEq('type'),
    pipe(
      path(['message', 'entities']),
      defaultTo([]))
  ])

export let getEntityFirst = useWith(
  find, [
    propEq('type'),
    pipe(
      path(['message', 'entities']),
      defaultTo([]))
  ])

export let getEntityFirstValue = curryN(2, (type, update) => {
  let match = getEntityFirst(type, update)
  return update.message.text.substr(match.offset, match.length)
})
