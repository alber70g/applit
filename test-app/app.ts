import { applit, Action } from '../src/index';
import { html } from 'lit-html';
import { asyncReplace } from 'lit-html/lib/async-replace';

const up: Action<AppState> = () => (state) => {
  return { ...state, count: state.count + 1 };
};

const down: Action<AppState> = () => (state) => {
  return { ...state, count: state.count - 1 };
};

const submitForm: Action<AppState> = (ev) => (state) => {
  ev.preventDefault();
  return {
    ...state,
    form: {
      input1: { ...state.form.input1, value: (ev as any).target.naam.value },
    },
  };
};

const setDirty: Action<AppState> = () => (state) => {
  if (state.form.input1.dirty) return state;
  return {
    ...state,
    form: {
      ...state.form,
      input1: {
        ...state.form.input1,
        dirty: true,
      },
    },
  };
};

type AppState = ReturnType<typeof initialState>;

const initialState = () => ({
  count: 0,
  form: { input1: { value: '', dirty: false } },
});

const bind = applit(
  initialState,
  (bind, state) => html`
    <h1>Counter</h1>
    <p>${state.count}</p>

    <form onsubmit=${bind(submitForm)}>
      <label>Naam <input name="naam" type="text" onkeyup=${bind(setDirty)} />
      </label>
    </form>

    <button onclick=${bind(up)}>Up</button>
    <button onclick=${bind(down)}>Down</button>

    <pre>${JSON.stringify(state, null, 2)}</pre>
  `,
  document.body
);
