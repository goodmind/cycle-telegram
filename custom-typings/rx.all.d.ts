declare module Rx {
  export interface Observable<T> {
    pluck<TResult>(...props: string[]): Observable<TResult>
  }
}