# Cycle Telegram Driver

[![Join the chat at https://gitter.im/goodmind/cycle-telegram](https://badges.gitter.im/goodmind/cycle-telegram.svg)](https://gitter.im/goodmind/cycle-telegram?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A  [Cycle.js](http://cycle.js.org) [Driver](http://cycle.js.org/drivers.html) for Telegram

```
npm install cycle-telegram
```

[![npm version](https://badge.fury.io/js/cycle-telegram.svg)](https://badge.fury.io/js/cycle-telegram)

# Usage

```js
import {makeTelegramDriver, reply} from 'cycle-telegram'
import {run} from '@cycle/core'

import Rx from 'rx'

let main = (sources) => {
  let intents = {
    messages: sources.Bot.events('message')
      .share()
  }

  let request = Rx.Observable.from([
    intents.map(reply({
      text: 'Reply to message'
    }))
  ]);

  return {
    Bot: request
  }
}

run(main, {
  Bot: makeTelegramDriver('<YOUR_TOKEN_HERE>')
})
```

- - -

[![Dependency Status](https://david-dm.org/goodmind/cycle-telegram.svg)](https://david-dm.org/goodmind/cycle-telegram)
[![devDependency Status](https://david-dm.org/goodmind/cycle-telegram/dev-status.svg)](https://david-dm.org/goodmind/cycle-telegram#info=devDependencies)
