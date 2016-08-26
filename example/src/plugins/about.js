import { reply } from 'cycle-telegram'

function About ({props}, update) {
  let text = `
  Cycle Telegram v0.2.2 (https://git.io/vrs3P)
  `
  return {
    bot: reply({ text }, update)
  }
}

export default About
