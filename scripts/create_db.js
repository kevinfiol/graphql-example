import Database from 'libsql';
import { faker } from '@faker-js/faker';

const NUMBER_OF_USERS = 500;
const db = new Database('users.db', { readonly: false });

// create `user` table
db.exec(`
  create table if not exists user (
    firstname text not null,
    lastname text not null,
    age number not null,
    email text not null,
    title text,
    description text,
    profile text
  );
`);

const users = [];
for (let i = 0; i < NUMBER_OF_USERS; i++) {
  users.push({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 95 }),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    profile: faker.lorem.sentences()
  });
}

const insert = db.prepare(`
  insert into user (firstname, lastname, age, email, title, description, profile)
  values (:firstname, :lastname, :age, :email, :title, :description, :profile)
`);

const insertTransaction = db.transaction((xs) => {
  for (const x of xs) insert.run(x);
});

insertTransaction(users);