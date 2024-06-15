import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { db } from './sqlite.js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    profile: { type: GraphQLString },
  }
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  args: UserType.getFields(),
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: (source, args, context, info) => {
        console.log({args});
        // console.log({source, args, context, info});
        // console.log(info.fieldNodes);
        const select = db.prepare('select * from user');
        const rows = select.all();
        console.log(rows);
        return rows;
      }
    }
  }
});

export const schema = new GraphQLSchema({ query: QueryType });