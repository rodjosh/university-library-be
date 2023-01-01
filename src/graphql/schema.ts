import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { mutations } from "@src/mutations";
import { queries } from "@src/queries";

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...queries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...mutations,
    },
  }),
});
