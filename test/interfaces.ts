import tape from 'tape'
import X = require('../lib')

export type OnErrorFn<T> =
  (dispose: T, t: tape.Test) => (err: any) => void

export type OkTakeFn<Dispose> =
  <U>(
    t: tape.Test,
    source: X.GenericStream<U>,
    dispose: Dispose,
    next: (m: U) => void,
    error?: (e: any) => void
  ) => void

export type OkDropFn<Dispose> =
  <U>(
    t: tape.Test,
    source: X.GenericStream<U>,
    dispose: Dispose,
    next: (m: U) => void,
    error?: (e: any) => void
  ) => void
