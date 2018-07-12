import { html } from 'lit-html';
import { AppState } from './app';
import { Action } from '../src';

const navigate = (view): Action<AppState> => (ev) => (state) => {
  ev.preventDefault();
  return {
    ...state,
    view,
  };
};

export const link = (bind, { href, title, view }) =>
  html`<a onclick=${bind(navigate(view))} href=${href}>${title}</a>`;
