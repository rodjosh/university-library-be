import { DataTypes } from "sequelize";
import { getSequelize } from "@src/database/init";

const sequelize = getSequelize();

export const syncAllModels = async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
};

export const dropAllTables = async () => {
  await sequelize.drop();
  console.log("All tables dropped!");
};

export const modelIdField = {
  type: DataTypes.UUID,
  allowNull: false,
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4,
};
