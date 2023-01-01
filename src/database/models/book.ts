import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { modelIdField } from "@src/database/utils";
import { getSequelize } from "@src/database/init";

const sequelize = getSequelize();

interface Book
  extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
  id: CreationOptional<string>;
  title: string;
  author: string;
  published_year: number;
  genre: string;
  available_copies: number;
  checkout_by_user_ids: string[];
}

export const Book = sequelize.define<Book>(
  "Book",
  {
    id: modelIdField,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    published_year: DataTypes.INTEGER,
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
