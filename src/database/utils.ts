import { DataTypes } from "sequelize";
import { getSequelize } from "@src/database/init";
import { createUser } from "@src/database/controllers/user";
import { createBook } from "@src/database/controllers/book";
import base from "@src/database/base.json";

const sequelize = getSequelize();

export const syncAllModels = async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
};

export const createBaseData = async () => {
  const users = base.users;
  const books = base.books;

  for await (const user of users) {
    await createUser(user as any);
  }

  for await (const book of books) {
    await createBook(book as any);
  }
};

export const syncAllModelsForce = async () => {
  await sequelize.sync({ force: true });
  // await createBaseData();

  console.log("All models were forced synchronized successfully.");
};

export const modelIdField = {
  type: DataTypes.UUID,
  allowNull: false,
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4,
};
