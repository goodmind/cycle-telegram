import { Observable as $ } from 'rx';
export declare function makeUpdates(initialState: any, token: any): $<any>;
export declare function makeWebHook(initialState: any, action: any): $<any>;
export declare function makeSources(state: any): {
    message: $<any>;
    inlineQuery: any;
    chosenInlineResult: any;
    callbackQuery: any;
};
