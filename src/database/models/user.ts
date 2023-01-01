import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { getSequelize } from "@src/database/init";
import { modelIdField } from "@src/database/utils";

const sequelize = getSequelize();

interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: CreationOptional<string>;
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "librarian";
  requested_book_ids: string[];
}

export const User = sequelize.define<User>(
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
