import { h, render, hydrate } from 'preact';
import { useEffect } from 'preact/hooks';
import { html } from 'htm/preact';
import navaid from 'navaid';
import { TablePage } from './TablePage.js';
import { UserPage } from './UserPage.js';

let $page;

const setPage = (component, props = {}) => {
  hydrate(h(component, props), $page);
};

export const router = navaid('/')
  .on('/', () => {
    setPage(TablePage);
  })
  .on('/user/:rowid', (props) => {
    setPage(UserPage, props);
  });

function App() {
  useEffect(router.listen, []);

  return html`
    <div ref=${(el) => ($page = el)} />
  `
}

render(html`<${App}/>`, document.querySelector('main'));