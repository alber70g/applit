import { applit, Action } from '../src/index';
import { html } from 'lit-html';

const up: Action<AppState> = () => (state) => {
  return { ...state, count: state.count + 1 };
};

const down: Action<AppState> = () => (state) => {
  return { ...state, count: state.count - 1 };
};

const incr: Action<AppState> = () => (state) => {
  return { ...state, count: state.count + 99 };
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

const setDirty = () => (state: any) => {
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

const initialState = () => ({
  count: 0,
  form: { input1: { value: '', dirty: false } },
});
type AppState = ReturnType<typeof initialState>;

applit(
  initialState,
  (bind, state) => html`
    <h1>Counter</h1>
    <p>${state.count}</p>

    <form onsubmit=${bind(submitForm, bind)}>
      <label>Naam <input name="naam" type="text" onkeyup=${bind(
        setDirty,
        bind
      )} />
      </label>
    </form>

    <button onclick=${bind(up, bind)}>Up</button>
    <button onclick=${bind(down, bind)}>Down</button>

    <pre>${JSON.stringify(state, null, 2)}</pre>
  `,
  document.body
);
