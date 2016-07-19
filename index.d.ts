import { Observable, IDisposable } from 'rx'

declare namespace CycleTelegram {
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

  interface WebhookResponse {
    type: 'webhook';
    update: Update;
  }

  function editMessageText(options:any, update:Update): TelegramDriverSink<'editMessageText', any>;
  function editMessageText(options:any): (update:Update) => TelegramDriverSink<'editMessageText', any>;

  function broadcast(options:any, update:Update): TelegramDriverSink<'sendMessage', any>;
  function broadcast(options:any): (update:Update) => TelegramDriverSink<'sendMessage', any>;

  function reply(options:any, update:Update): TelegramDriverSink<'sendMessage', any>;
  function reply(options:any): (update:Update) => TelegramDriverSink<'sendMessage', any>;

  function answerInlineQuery(options:any, update:Update): TelegramDriverSink<'answerInlineQuery', any>;
  function answerInlineQuery(options:any): (update:Update) =>TelegramDriverSink<'answerInlineQuery', any>;

  function answerCallbackQuery(options:any, update:Update): TelegramDriverSink<'answerCallbackQuery', any>;
  function answerCallbackQuery(options:any): (update:Update) => TelegramDriverSink<'answerCallbackQuery', any>;

  function setWebhook(options?:any): TelegramDriverSink<'setWebhook', any>;

  function webhook(update:Update): WebhookResponse;

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
