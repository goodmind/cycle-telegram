export function isUpdateMessageCommand (update): update is UpdateMessageCommand {
  return entityIs('bot_command', update)
}

export function isUpdateMessageText (update): update is UpdateMessageText {
  return !!update.message.text
}

export function isUpdateInlineQuery (update): update is UpdateInlineQuery {
  return !!update.inline_query
}



