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
  password: string;
}

export const User = sequelize.define<User>(
  "User",
  {
    id: modelIdField,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    role: DataTypes.ENUM("student", "librarian"),
    requested_book_ids: DataTypes.ARRAY(DataTypes.STRING),
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  },
  {
    indexes: [
      { fields: ["id"] },
      { fields: ["role"] },
      { fields: ["requested_book_ids"] },
    ],
  }
);
