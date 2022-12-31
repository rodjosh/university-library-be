import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */

const testType = new GraphQLObjectType({
  name: "Test",
  fields: {
    first: {
      type: GraphQLString,
    },
    second: {
      type: GraphQLString,
    },
  },
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
      test: {
        type: testType,
        resolve: () => ({
          first: "Hello World first",
          second: "Hello World second",
        }),
      },
    },
  }),
});
