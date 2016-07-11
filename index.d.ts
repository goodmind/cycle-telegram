import { IDisposable, Observable } from 'rx'

declare module CycleTelegram {
  namespace TelegramTypes {
    export interface Update {
      update_id:number;
      message?:any;
      inline_query?:any;
      chosen_inline_result?:any;
      callback_query?:any;
    }

    export interface MessageEntity {
      type:string;
      offset:number;
      length:number;
      url?:string;
    }
  }

  export namespace TelegramSinks {
    import Update = TelegramTypes.Update;
    import TelegramDriverSink = TelegramDriver.TelegramDriverSink;

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

    export function broadcast(options:SendMessageOptions, update:Update):TelegramDriverSink<'sendMessage', SendMessageOptions>;
    export function broadcast(options:SendMessageOptions):(update:Update) =>
      TelegramDriverSink<'sendMessage', SendMessageOptions>;

    export function reply(options:SendMessageOptions, update:Update):TelegramDriverSink<'sendMessage', SendMessageOptions>;
    export function reply(options:SendMessageOptions):(update:Update) =>
      TelegramDriverSink<'sendMessage', SendMessageOptions>;

    export function answerInlineQuery(options:AnswerInlineQueryOptions, update:Update):TelegramDriverSink<'answerInlineQuery', AnswerInlineQueryOptions>;
    export function answerInlineQuery(options:AnswerInlineQueryOptions):(update:Update) =>
      TelegramDriverSink<'answerInlineQuery', AnswerInlineQueryOptions>;

    export function answerCallbackQuery(options:AnswerCallbackQueryOptions, update:Update):TelegramDriverSink<'answerCallbackQuery', AnswerCallbackQueryOptions>;
    export function answerCallbackQuery(options:AnswerCallbackQueryOptions):(update:Update) =>
      TelegramDriverSink<'answerCallbackQuery', AnswerCallbackQueryOptions>;

    export function setWebhook(options?:SetWebhookOptions):TelegramDriverSink<'setWebhook', SetWebhookOptions>;

    export function webhook(update:Update):WebhookResponse;
  }

  export namespace TelegramDriver {
    import Update = TelegramTypes.Update;
    import MessageEntity = TelegramTypes.MessageEntity;

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
      observable:Observable<Update>;
      responses:Observable<any>;
      events:EventsFn;
    }

    export function makeTelegramDriver(token:Token,
                                       options?:TelegramDriverOptions):(request:Observable<TelegramDriverSink>) => TelegramDriverExecution;

    export function getEntityFirst(type:string, update:Update):MessageEntity;
    export function getEntityFirst(type:string):(update:Update) => MessageEntity;

    export function getEntityFirstValue(type:string, update:Update):string;
    export function getEntityFirstValue(type:string):(update:Update) => string;

    export function entityIs(type:string, update:Update):boolean;
    export function entityIs(type:string):(update:Update) => boolean;
  }
}

declare module 'cycle-telegram' { export = CycleTelegram }
