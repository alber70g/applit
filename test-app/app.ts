import { applit } from '../src/index';
import { html, render } from 'lit-html/lib/lit-extended';
import { until } from 'lit-html/lib/until';
import { counter } from './counter';
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
    <div>
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
      ${link(bind, {
        href: '/lazy',
        title: 'lazy',
        view: 'lazy',
      })} 
    </div>
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

      case 'lazy':
        return layout(
          bind,
          until(
            import('./lazy').then(({ lazy }) => lazy(bind, state)),
            html`<div>Loading...</div>`
          ),
          state
        );

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

// setInterval(() => bind(up), 1000);
