import t from 'tcomb'
import chalk from 'chalk'

import { Update, UpdatesState } from '../types'

let logResponse = (state) => t.match(state,
  Update, ({message: msg}) => {
    console.log('>>> ' +
      `${chalk.gray('#')}${chalk.blue(msg.message_id)} ` +
      `${msg.text} ` +
      `${chalk.yellow.bold('by')} ${msg.from.username} ` +
      `${chalk.yellow.bold('in')} ${msg.chat.title ? msg.chat.title : msg.chat.first_name}`)
  },
  UpdatesState, ({startDate}) => {
    console.log(chalk.green(`Uptime is ${new Date(startDate)}`))
  }
)

let handleRequest = (request, onNext) => {
  return request
    .mergeAll()
    .subscribe(onNext)
}

export function makeTelegramLogDriver () {
  return function telegramLogDriver (request) {
    handleRequest(request, logResponse)
  }
}
