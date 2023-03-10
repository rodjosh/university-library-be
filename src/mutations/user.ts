import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";
import { userType } from "@src/graphql/types/user";

import {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "@src/database/controllers/user";

export const mCreateUser: GraphQLFieldConfig<any, any> = {
  type: userType,
  args: {
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { first_name, last_name, email, role, password }) => {
    return await createUser({
      first_name,
      last_name,
      email,
      role,
      password,
    });
  },
};

export const mUpdateUser: GraphQLFieldConfig<any, any> = {
  type: userType,
  args: {
    user_id: { type: new GraphQLNonNull(GraphQLString) },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (obj, { user_id, ...attrs }) => {
    return await updateUser(user_id, attrs);
  },
};

export const mLoginUser: GraphQLFieldConfig<any, any> = {
  type: userType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { email, password }) => {
    return await loginUser(email, password);
  },
};

export const mDeleteUser: GraphQLFieldConfig<any, any> = {
  type: userType,
  args: {
    user_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { user_id }) => {
    return await deleteUser(user_id);
  },
};
