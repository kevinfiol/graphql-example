import { db } from '../sqlite.js';
import { faker } from '@faker-js/faker';

const NUMBER_OF_USERS = 1000;

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

// generate users with fake data
const users = [];
for (let i = 0; i < NUMBER_OF_USERS; i++) {
  users.push({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 95 }),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    profile: faker.word.words({ count: { min: 5, max: 20 } })
  });
}

// define insert statement
const insert = db.prepare(`
  insert into user (firstname, lastname, age, email, title, description, profile)
  values (:firstname, :lastname, :age, :email, :title, :description, :profile)
`);

// build an insert transaction and insert all users
const insertTransaction = db.transaction((xs) => {
  for (const x of xs) insert.run(x);
});

insertTransaction(users);