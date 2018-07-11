import {
  TemplateResult,
  directive,
  AttributePart,
  DirectiveFn,
  render,
} from 'lit-html';

const bindViewFactory = <TState>(
  state: TState,
  templateFn: View<TState>,
  element: HTMLElement
) => {
  const bindFn = (templateFn: View<TState>, element: HTMLElement) => (
    action: Action<TState>
  ) => {
    state = action()(state);
    render(templateFn(bindViewFn, state), element);
  };
  const bindViewFn = (action: Action<TState>) => {
    return directive((attributePart: AttributePart) => {
      debugger;
      if (attributePart.name.indexOf('on') === 0) {
        // element.onclick = () => {}
        (<any>attributePart.element)[attributePart.name] = (ev: Event) => {
          state = action(ev)(state);
          render(templateFn(bindViewFn, state), element);
        };
      }
    });
  };
  return { bindViewFn, bindFn };
};

export const applit = <TState>(
  init: () => TState,
  templateFn: View<TState>,
  element: HTMLElement = document.body
) => {
  const state = init();

  const viewFns = bindViewFactory<TState>(state, templateFn, element);
  const bindFn = viewFns.bindFn(templateFn, element);

  render(templateFn(viewFns.bindViewFn, state), element);

  return bindFn;
};

export type View<TState> = (
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

export type Action<TState> = (ev?: Event) => (state: TState) => TState;

export type DeepOptional<T> = { [P in keyof T]?: DeepOptional<T[P]> };
