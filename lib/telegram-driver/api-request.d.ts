import { Observable as $ } from 'rx';
export declare function makeAPIRequest({token, method, query, httpMethod}: {
    token: any;
    method: any;
    query: any;
    httpMethod?: string;
}): $<any>;
