import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { gql } from './gql.js';
import { AllUsers } from './queries.js';

export function TablePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    gql(AllUsers)
      .then((res) => setUsers(res.data.users));
  }, []);

  return html`
    <div>
      <table>
        <caption>
          List of users in SQLite Database
        </caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Title</th>
            <th scope="col">Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${users.map((user) => html`
            <tr>
              <th scope="row">${user.rowid}</th>
              <td>${user.firstname} ${user.lastname}</td>
              <td>${user.title}</td>
              <td>${user.email}</td>
              <td><a href="/user/${user.rowid}">Edit</a></td>
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}
