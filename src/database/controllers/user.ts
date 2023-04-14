// import { User } from "@src/database/models/user";
// import { UserInterface } from "@src/database/models/types";
// import { Op } from "sequelize";

import { getUsersCollection } from "@src/database/models/user";
import { ObjectId } from "mongodb";

export interface CreateUserProps {
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "librarian";
  password: string;
}

// export const createUser = async (attrs: CreateUserProps) => {
//   return await User.create({
//     ...attrs,
//     requested_book_ids: [],
//   });
// };

export const createUser = async (attrs: CreateUserProps) => {
  const users = await getUsersCollection();

  const result = await users.insertOne({
    ...attrs,
    requested_book_ids: [],
  });

  const user = await users.findOne({ _id: new ObjectId(result.insertedId) });
  return user;
};

// export const updateUser = async (id: string, attrs: Partial<UserInterface>) => {
//   const user = await User.findByPk(id);
//   if (!user) return;

//   await user.update({ ...attrs });
//   await user.reload();
//   return user;
// };

export const updateUser = async (
  id: string,
  attrs: Partial<CreateUserProps>
) => {
  const users = await getUsersCollection();

  const result = await users.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...attrs } },
    { returnDocument: "after" }
  );

  return result.value;
};

// export const getUser = async (id: string) => {
//   return await User.findByPk(id);
// };

export const getUser = async (id: string) => {
  const users = await getUsersCollection();
  const user = await users.findOne({ _id: new ObjectId(id) });
  return user;
};

// export const getAllUsers = async (offset?: number, limit?: number) => {
//   return await User.findAll({
//     offset,
//     limit,
//   });
// };

export const getAllUsers = async (offset?: number, limit?: number) => {
  const users = await getUsersCollection();
  const result = await users
    .find()
    .skip(offset || 0)
    .limit(limit || 0)
    .toArray();

  return result;
};

// export const getAllStudents = async (offset?: number, limit?: number) => {
//   return await User.findAll({
//     offset,
//     limit,
//     where: {
//       role: { [Op.eq]: "student" },
//     },
//   });
// };

export const getAllStudents = async (offset?: number, limit?: number) => {
  const users = await getUsersCollection();
  const result = await users
    .find({ role: "student" })
    .skip(offset || 0)
    .limit(limit || 0)
    .toArray();

  return result;
};

// export const loginUser = async (email: string, password: string) => {
//   return await User.findOne({
//     where: {
//       email: { [Op.eq]: email },
//       password: { [Op.eq]: password },
//     },
//   });
// };

export const loginUser = async (email: string, password: string) => {
  const users = await getUsersCollection();
  const user = await users.findOne({ email, password });
  return user;
};

// export const deleteUser = async (id: string) => {
//   const user = await User.findByPk(id);
//   if (!user) return;

//   await user.destroy();
//   return true;
// };

export const deleteUser = async (id: string) => {
  const users = await getUsersCollection();
  const result = await users.findOneAndDelete({ _id: new ObjectId(id) });
  return result.value;
};
