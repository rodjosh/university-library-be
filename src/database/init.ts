// import { Sequelize } from "sequelize";
// let sequelize: Sequelize;

// export const getSequelize = () => {
//   if (!sequelize) {
//     if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
//     sequelize = new Sequelize(process.env.DATABASE_URL, {
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false,
//         },
//       },
//     });
//   }

//   return sequelize;
// };

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI as string;
let mongo: MongoClient;

export const getMongo = async () => {
  if (!mongo) {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set");
    mongo = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await mongo.connect();
    await mongo.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  }

  return mongo;
};
