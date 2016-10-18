import tape from 'tape'

export interface OnErrorFn<T> {
  (sources: T, t: tape.Test): (err: any) => void
}

export interface OkTakeFn<T> {
  <U>(
    t: tape.Test,
    sources: T,
    next: (m: U) => void,
    error?: (e: any) => void
  ): void
}

export interface OkDropFn<T> {
  <U>(
    t: tape.Test,
    sources: T,
    next: (m: U) => void,
    error?: (e: any) => void
  ): void
}
