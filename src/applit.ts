import { html } from '../node_modules/lit-html/lit-html';

export class Applit {

}

class App extends Applit {
  /**
   *
   */
  constructor() {
    super();
    
  }

  up(state) {
    
  }

  render(bind, state) {
    return html`
      <div>
        Count is ${state.count}
      </div>
      <div>
        <button onclick="${bind(this.up)}"></button>
      </div>
    `
  }
}
