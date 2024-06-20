import Database from 'libsql';

export const db = new Database('users.db', { readonly: false });

// Usually, people would use an ORM or a Query Builder library like Knex
// Here I built a minimal query builder for SQLite
export function sql(query = '') {
  return new Builder(query);
}

class Builder {
  constructor(query) {
    this.query = query;
    this.sets = [];
    this.wheres = [];
    this.params = {};
  }

  update(params) {
    for (const key in params) {
      this.sets.push(`${key} = :${key}`);
      this.params[key] = params[key];
    }

    return this;
  }

  where(params) {
    for (const key in params) {
      this.wheres.push(`${key} = :${key}`);
      this.params[key] = params[key];
    }

    return this;
  }

  build() {
    const sets = this.sets.join(', ');
    const wheres = this.wheres.join(' and ');
    const query = this.query +
      (sets.length ? ` set ${sets}` : '') +
      (wheres.length ? ` where ${wheres}` : '');

    return query;
  }
}
