import { DataTypes } from "sequelize";

export const modelIdField = {
  type: DataTypes.UUID,
  allowNull: false,
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4,
};
