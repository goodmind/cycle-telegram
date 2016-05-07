# Cycle Telegram Driver

A  [Cycle.js](http://cycle.js.org) [Driver](http://cycle.js.org/drivers.html) for Telegram

```
npm install cycle-telegram
```

[![npm version](https://badge.fury.io/js/cycle-telegram.svg)](https://badge.fury.io/js/cycle-telegram)

# Usage

```js
import {makeTelegramDriver, reply} from 'cycle-telegram';
import {run} from '@cycle/core';

import Rx from 'rx';

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
  };
}

run(main, {
  Bot: makeTelegramDriver('<YOUR_TOKEN_HERE>')
});
```
