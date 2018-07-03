import { TemplateResult } from 'lit-html';
export declare const applit: (init: (state?: any) => Map<any>, view: (bind: any, state: Map<any>) => TemplateResult, element?: HTMLElement) => void;
export declare type Map<T> = {
    [key: string]: T;
};
export declare type Action<TState = Map<any>> = (ev: Event) => (state: TState) => TState;
