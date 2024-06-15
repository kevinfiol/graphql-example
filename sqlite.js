import Database from 'libsql';

export const db = new Database('users.db', { readonly: false });

export function where(sql = '', params = {}) {
  const conditions = [];

  for (const key in params) {
    conditions.push(`${key} = :${key}`);
  }

  if (conditions.length > 0) {
    sql += ' where ' + conditions.join(' and ');
  }

  return sql;
}