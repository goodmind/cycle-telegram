import { Observable, IDisposable } from 'rx'

declare module CycleTelegram {
  interface Update {
    update_id:number;
    message?:any;
    inline_query?:any;
    chosen_inline_result?:any;
    callback_query?:any;
  }

  interface MessageEntity {
    type:string;
    offset:number;
    length:number;
    url?:string;
  }

  interface SetWebhookOptions {
    url?:string;
    certificate?:any;
  }

  interface SendMessageOptions {
    chat_id:number | string;
    text:string;
    parse_mode?:string;
    disable_web_page_preview?:boolean;
    disable_notification?:boolean;
    reply_to_message_id?:number;
    reply_markup?:any;
  }

  interface AnswerInlineQueryOptions {
  }

  interface AnswerCallbackQueryOptions {
  }

  interface WebhookResponse {
    type:'webhook';
    update:Update;
  }

  function broadcast(options:SendMessageOptions, update:Update):TelegramDriverSink<'sendMessage', SendMessageOptions>;
  function broadcast(options:SendMessageOptions):(update:Update) =>
    TelegramDriverSink<'sendMessage', SendMessageOptions>;

  function reply(options:SendMessageOptions, update:Update):TelegramDriverSink<'sendMessage', SendMessageOptions>;
  function reply(options:SendMessageOptions):(update:Update) =>
    TelegramDriverSink<'sendMessage', SendMessageOptions>;

  function answerInlineQuery(options:AnswerInlineQueryOptions, update:Update):TelegramDriverSink<'answerInlineQuery', AnswerInlineQueryOptions>;
  function answerInlineQuery(options:AnswerInlineQueryOptions):(update:Update) =>
    TelegramDriverSink<'answerInlineQuery', AnswerInlineQueryOptions>;

  function answerCallbackQuery(options:AnswerCallbackQueryOptions, update:Update):TelegramDriverSink<'answerCallbackQuery', AnswerCallbackQueryOptions>;
  function answerCallbackQuery(options:AnswerCallbackQueryOptions):(update:Update) =>
    TelegramDriverSink<'answerCallbackQuery', AnswerCallbackQueryOptions>;

  function setWebhook(options?:SetWebhookOptions):TelegramDriverSink<'setWebhook', SetWebhookOptions>;

  function webhook(update:Update):WebhookResponse;

  type Token = string;
  type EventsFn = (eventName:string) => Observable<Update>;

  interface TelegramDriverOptions {
    webhook?:boolean;
    startDate?:number;
  }

  interface TelegramDriverSink<T, U> {
    type:string;
    method:T;
    options:U;
  }

  interface TelegramDriverExecution extends IDisposable {
    token:Token;
    updates:Observable<Update>;
    responses:Observable<any>;
    events:EventsFn;
  }

  function makeTelegramDriver(token:Token,
                              options?:TelegramDriverOptions):(request:Observable<TelegramDriverSink<any, any>>) => TelegramDriverExecution;

  function getEntityFirst(type:string, update:Update):MessageEntity;
  function getEntityFirst(type:string):(update:Update) => MessageEntity;

  function getEntityFirstValue(type:string, update:Update):string;
  function getEntityFirstValue(type:string):(update:Update) => string;

  function entityIs(type:string, update:Update):boolean;
  function entityIs(type:string):(update:Update) => boolean;
}

export = CycleTelegram
