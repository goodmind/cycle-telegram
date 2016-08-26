declare module 'tape-nock' {
  import tape = require('tape')

  export = tapeNockFactory

  function tapeNock(name: string, cb: tape.TestCase): void
  function tapeNock(name: string, opts: tape.TestOptions, cb: tape.TestCase): void
  function tapeNock(cb: tape.TestCase): void
  function tapeNock(opts: tape.TestOptions, cb: tape.TestCase): void

  namespace tapeNock {
    export let nock: any
  }

  function tapeNockFactory(tapeTest: typeof tape, nockOpts: { fixtures: string, mode?: string }): typeof tapeNock
  namespace tapeNockFactory {}
}
