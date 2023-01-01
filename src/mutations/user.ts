import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";
import {
  createUser,
  deleteUser,
  updateUser,
} from "@src/database/controllers/user";
import { userType } from "@src/graphql/types/user";

export const mCreateUser: GraphQLFieldConfig<any, any> = {
  type: userType,
  args: {
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { first_name, last_name, email, role }) => {
    return await createUser({
      first_name,
      last_name,
      email,
      role,
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
  },
  resolve: async (obj, { user_id, ...attrs }) => {
    return await updateUser(user_id, attrs);
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
