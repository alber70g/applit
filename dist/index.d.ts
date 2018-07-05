import { TemplateResult, AttributePart, DirectiveFn } from 'lit-html';
export declare const applit: <TState>(init: () => TState, templateFn: TemplateFn<TState>, element?: HTMLElement) => (action: Action<TState>) => DirectiveFn<AttributePart>;
export declare type TemplateFn<TState> = (bind: BindFn<TState>, state: TState) => TemplateResult;
export declare type BindFn<TState> = (action: Action<TState>, path?: string) => DirectiveFn<AttributePart>;
export declare type Map<T> = {
    [key: string]: T;
};
export declare type Action<TState> = (ev: Event) => (state: TState) => TState;
