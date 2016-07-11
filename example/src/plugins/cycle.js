import { answerInlineQuery } from 'cycle-telegram'

function CycleJS ({props}, update) {
  let results = [
    {
      type: 'article',
      title: 'Cycle.js',
      input_message_content: {
        message_text:
          'A functional and reactive JavaScript framework for cleaner code'
      }
    }
  ]
  return {
    bot: answerInlineQuery({ results }, update)
  }
}

export default CycleJS
