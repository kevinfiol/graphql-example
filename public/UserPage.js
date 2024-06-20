import { html } from 'htm/preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { router } from './main.js';
import { gql } from './gql.js';
import { UserInfo, UpdateUserInfo } from './queries.js';

export function UserPage(props) {
  const [user, setUser] = useState({});
  const formRef = useRef(null);
  const rowid = Number(props.rowid);

  useEffect(() => {
    gql(UserInfo, { rowid })
      .then((res) => setUser(res.data.users[0]))
  }, []);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const variables = { rowid };
    const formData = new FormData(formRef.current);
    formData.forEach((value, key) => variables[key] = value);

    gql(UpdateUserInfo, variables)
      .then(() => router.route('/'));
  }

  return html`
    <div>
      <nav style="display: flex; justify-content: space-between; margin: 1em 0;">
        <a href="/">Go Back</a>
      </nav>

      <form ref=${formRef} onSubmit=${onSubmit}>
        ${Object.entries(user).map(([key, value]) => {
          if (key === 'rowid' || key === 'age') return null;

          return html`
            <span>
              <label for=${key}>${key}</label>
              <input type="text" name=${key} defaultValue=${value} />
            </span>
          `;
        })}

        <div style="margin: 1em 0;">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  `;
}