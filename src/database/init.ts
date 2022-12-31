import { Sequelize } from "sequelize";
let sequelize: Sequelize;

export const getSequelize = () => {
  if (!sequelize) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
  }

  return sequelize;
};
