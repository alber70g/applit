import {
  TemplateResult,
  directive,
  AttributePart,
  DirectiveFn,
  render,
  html,
} from 'lit-html';

const bindFactory = <TState>(
  state: TState,
  templateFn: TemplateFn<TState>,
  element: HTMLElement
) => {
  const bindFn = (action: Action<TState>) =>
    directive((attributePart: AttributePart) => {
      if (attributePart.name.indexOf('on') === 0) {
        (<any>attributePart.element)[attributePart.name] = (ev: Event) => {
          state = action(ev)(state);
          render(templateFn(bindFn, state), element);
        };
      }
    });
  return bindFn;
};

export const applit = <TState>(
  init: () => TState,
  templateFn: TemplateFn<TState>,
  element: HTMLElement = document.body
) => {
  const state = init();

  const bindFn = bindFactory<TState>(state, templateFn, element);
  render(templateFn(bindFn, state), element);

  return bindFn;
};

export type TemplateFn<TState> = (
  bind: BindFn<TState>,
  state: TState
) => TemplateResult;

export type BindFn<TState> = (
  action: Action<TState>,
  path?: string
) => DirectiveFn<AttributePart>;

export type Map<T> = {
  [key: string]: T;
};

export type Action<TState> = (ev: Event) => (state: TState) => TState;
