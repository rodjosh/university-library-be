import { GraphQLObjectType, GraphQLList, GraphQLString } from "graphql";

export const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    requested_book_ids: { type: new GraphQLList(GraphQLString) },
  },
});
