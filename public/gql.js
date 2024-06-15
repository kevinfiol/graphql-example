const API = '/gql';

// // Prepare simple query
// const query = `
//   query Query($name: String!) {
//     pokemon(name: $name) {
//       number
//       name
//       attacks {
//         special {
//           name
//           type
//         }
//       }
//     }
//   }
// `;

export async function gql(query = '', variables = {}) {
  if (!query.trim()) {
    throw Error('Error: Empty query provided');
  }

  const body = { query, variables };
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });

  const text = await res.text();
  console.log(text);
  return text;
}
