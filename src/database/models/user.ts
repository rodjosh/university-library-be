import { DataTypes } from "sequelize";
import { getSequelize } from "@src/database/init";
import { modelIdField } from "@src/database/utils";

const sequelize = getSequelize();

export const User = sequelize.define(
  "User",
  {
    id: modelIdField,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM("student", "librarian"),
    requested_book_ids: DataTypes.ARRAY(DataTypes.STRING),
  },
  {
    indexes: [
      { fields: ["id"] },
      { fields: ["role"] },
      { fields: ["requested_book_ids"] },
    ],
  }
);

export const Book = sequelize.define(
  "Book",
  {
    id: modelIdField,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    published_year: DataTypes.STRING,
    genre: DataTypes.STRING,
    available_copies: DataTypes.INTEGER,
    checkout_by_user_ids: DataTypes.ARRAY(DataTypes.STRING),
  },
  {
    indexes: [
      { fields: ["id"] },
      { fields: ["title"] },
      { fields: ["author"] },
      { fields: ["genre"] },
      { fields: ["checkout_by_user_ids"] },
    ],
  }
);
