import { User } from "@src/database/models/user";
import { UserInterface } from "@src/database/models/types";
import { Op } from "sequelize";

export interface CreateUserProps {
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "librarian";
  password: string;
}

export const createUser = async (attrs: CreateUserProps) => {
  return await User.create({
    ...attrs,
    requested_book_ids: [],
  });
};

export const updateUser = async (id: string, attrs: Partial<UserInterface>) => {
  const user = await User.findByPk(id);
  if (!user) return;

  await user.update({ ...attrs });
  await user.reload();
  return user;
};

export const getUser = async (id: string) => {
  return await User.findByPk(id);
};

export const getAllUsers = async (offset?: number, limit?: number) => {
  return await User.findAll({
    offset,
    limit,
  });
};

export const getAllStudents = async (offset?: number, limit?: number) => {
  return await User.findAll({
    offset,
    limit,
    where: {
      role: { [Op.eq]: "student" },
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  return await User.findOne({
    where: {
      email: { [Op.eq]: email },
      password: { [Op.eq]: password },
    },
  });
};

export const deleteUser = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) return;

  await user.destroy();
  return true;
};
