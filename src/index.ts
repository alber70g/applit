import { render } from 'lit-html';
import { TemplateResult, directive } from 'lit-html';

const bindFactory = (
  state: Map<any>,
  view: (bind: any, state: Map<any>) => TemplateResult,
  element: HTMLElement
) => (action: any, bindFn: any) =>
  directive((part: any) => {
    if (part.name.indexOf('on') === 0) {
      // part.element.onclick = () => {}
      part.element[part.name] = (ev: Event) => {
        state = action(ev)(state);
        render(view(bindFn, state), element);
      };
    }
  });

export const applit = (
  init: (state?: any) => Map<any>,
  view: (bind: any, state: Map<any>) => TemplateResult,
  element: HTMLElement = document.body
) => {
  const initState = init();

  const bindFn = bindFactory(initState, view, element);

  render(view(bindFn, initState), element);
};

export type Map<T> = {
  [key: string]: T;
};

export type Action<TState = Map<any>> = (
  ev: Event
) => (state: TState) => TState;
