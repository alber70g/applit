import { render, html } from 'lit-html';

const tpl = ({ count }) => html`Hi, this is the number ${nested({ count })}`;
const nested = ({ count }) => html`Blaat ${count}`;

render(tpl({ count: 1 }), document.body);

setTimeout(() => {
  render(tpl({ count: 2 }), document.body);
}, 2000);
