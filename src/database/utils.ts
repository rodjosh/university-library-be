import { getSequelize } from "@src/database/init";
import { createUser, CreateUserProps } from "@src/database/controllers/user";
import { createBook, CreateBookProps } from "@src/database/controllers/book";
import base from "@src/database/base.json";

const sequelize = getSequelize();

export const syncAllModels = async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
};

export const createBaseData = async () => {
  const users = base.users;
  const books = base.books;

  for (const user of users) {
    await createUser(user as CreateUserProps);
  }

  for (const book of books) {
    await createBook(book as CreateBookProps);
  }

  console.log("All models were synchronized successfully.");
};

export const syncAllModelsForce = async () => {
  await sequelize.sync({ force: true });
  await createBaseData();

  console.log("All models were forced synchronized successfully.");
};
