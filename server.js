import polka from 'polka';
import sirv from 'sirv';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema.js';

const app = polka();
const serve = sirv('public', { dev: true, single: true });

// serve graphql endpoint at /gql
app.use('/gql', createHandler({ schema }));

// serve static assets in 'public' folder
app.use('/', serve);

app.listen(8080, () => {
  console.log('Running on http://localhost:8080');
});