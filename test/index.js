import { run } from '@cycle/core'
import { makeTelegramDriver } from '../lib/index'
import { Observable as $ } from 'rx'

import test from 'tape'

let basicDriver = makeTelegramDriver('')

test('telegram driver', (t) => {
  t.end()
})
