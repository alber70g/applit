import { applit, Action } from '../src/index';
import { html } from 'lit-html/lib/lit-extended';
import { counter, up } from './counter';
import { link } from './link';

export type AppState = {
  view: string;
  count: number;
  form: {
    input1: {
      value: string;
      dirty: boolean;
    };
  };
};

const layout = (bind, view, state) => html`
    <p>
      ${link(bind, {
        href: '/',
        title: 'Home',
        view: 'home',
      })} 
      ${link(bind, {
        href: '/counter',
        title: 'Counter',
        view: 'counter',
      })} 
    </p>
    ${view}
      
    <fieldset style="margin-top: 20px; position: absolute; top: 10px; right: 10px; min-width: 350px">
      <legend>Current state</legend>
      <pre>${JSON.stringify(state, null, 2)}</pre>
    </fieldset>
  `;

const bind = applit<AppState>(
  () => ({
    count: 0,
    view: 'counter',
    form: { input1: { value: '', dirty: false } },
  }),
  (bind, state) => {
    switch (state.view) {
      case 'counter':
        return layout(bind, counter(bind, state), state);

      case 'home':
      default:
        return layout(bind, html`<h1>Home</h1>`, state);
    }
    return html`
    ${layout(bind, counter(bind, state), state)}
  `;
  },
  document.body
);

setInterval(() => bind(up), 1000);
