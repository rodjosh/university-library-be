import {
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

import {
  getAllStudents,
  getAllUsers,
  getUser,
} from "@src/database/controllers/user";

import { userType } from "@src/graphql/types/user";

export const qUsers: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(userType),
  args: {
    offset: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  },
  resolve: async (obj, { offset, limit }) => {
    return await getAllUsers(offset, limit);
  },
};

export const qStudents: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(userType),
  args: {
    offset: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  },
  resolve: async (obj, { offset, limit }) => {
    return await getAllStudents(offset, limit);
  },
};

export const qUser: GraphQLFieldConfig<any, any> = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { id }) => {
    return await getUser(id);
  },
};
