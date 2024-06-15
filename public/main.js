// import { render } from 'preact';
// import { html } from 'htm/preact';

// function App() {
//   return html`
//     <p>hello world</p>
//   `;
// }

// render(html`<${App}/>`, document.querySelector('main'));

import { gql } from './gql.js';

gql(`
  query UserInfo {
    users(firstname: Tomas) {
      firstname
      email
    }
  }
`);