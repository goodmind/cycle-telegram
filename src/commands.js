import { find, takeLast, curry, propEq } from 'ramda';
import { getEntityFirst } from './telegram-driver/index';

export let commandName = (update) => {
  let match = getEntityFirst('bot_command');

  return match(update);
};

export let findCommandIn = curry((commands, path) => {
  let match = find(([r, _]) => path.match(r), commands);

  if (!match) {
    match = takeLast(1, commands)[0]
  }

  return [match[0], match[1]];
});