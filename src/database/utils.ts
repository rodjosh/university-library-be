// import { getSequelize } from "@src/database/init";
import { createUser, CreateUserProps } from "@src/database/controllers/user";
import { createBook, CreateBookProps } from "@src/database/controllers/book";
import base from "@src/database/base.json";

import { getBooksCollection } from "@src/database/models/book";
import { getUsersCollection } from "@src/database/models/user";

// const sequelize = getSequelize();

// export const syncAllModels = async () => {
//   await sequelize.sync();
//   console.log("All models were synchronized successfully.");
// };

// export const createBaseData = async () => {
//   const users = base.users;
//   const books = base.books;

//   for (const user of users) {
//     await createUser(user as CreateUserProps);
//   }

//   for (const book of books) {
//     await createBook(book as CreateBookProps);
//   }

//   console.log("All models were synchronized successfully.");
// };

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

// export const syncAllModelsForce = async () => {
//   await sequelize.sync({ force: true });
//   await createBaseData();

//   console.log("All models were forced synchronized successfully.");
// };

export const syncAllModelsForce = async () => {
  const books = await getBooksCollection();
  books.deleteMany({});

  const users = await getUsersCollection();
  users.deleteMany({});

  await createBaseData();
  console.log("All models were forced synchronized successfully.");
};
