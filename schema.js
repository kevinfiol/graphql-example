import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';
import { db, sql } from './sqlite.js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    rowid: { type: GraphQLInt },
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
  fields: {
    users: {
      type: new GraphQLList(UserType),
      args: UserType.getFields(),
      resolve(_source, args) {
        const query = sql('select rowid, * from user')
          .where(args)
          .build();

        const select = db.prepare(query);
        return select.all(args);
      }
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateUser: {
      type: UserType,
      args: {
        ...UserType.getFields(),
        rowid: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(_source, args) {
        const rowid = args.rowid;
        delete args.rowid;

        const query = sql('update user')
          .update(args)
          .where({ rowid })
          .build()

        const update = db.prepare(query);
        update.run({ ...args, rowid });

        const selectQuery = sql('select rowid, * from user')
          .where({ rowid })
          .build();

        const select = db.prepare(selectQuery);
        return select.get({ rowid });
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});