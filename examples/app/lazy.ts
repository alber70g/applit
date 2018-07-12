import { html } from 'lit-html';

const sayHi = () => () => {
  alert('hi');
};

export const lazy = (bind, state) => html`
  <div>
    This is lazy <button onclick=${bind(sayHi)}>Say hi</button>
  </div>
`;
