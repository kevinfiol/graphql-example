const API = '/gql';

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

  const json = await res.json();
  return json;
}
