import { curryN, compose, evolve, pickAll, chain, keys } from 'ramda'

export * from './entities'

export let defaults = curryN(2, (transformations, obj) => compose(
  evolve(transformations),
  pickAll)(
    chain(keys, [transformations, obj]),
    obj))