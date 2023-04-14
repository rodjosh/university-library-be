import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const bookType = new GraphQLObjectType({
  name: "Book",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    published_year: { type: GraphQLString },
    genre: { type: GraphQLString },
    available_copies: { type: GraphQLInt },
    checkout_by_user_ids: { type: new GraphQLList(GraphQLString) },
  },
});
