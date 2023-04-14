import "dotenv/config";
import cors from "cors";
import express from "express";
import expressPlayground from "graphql-playground-middleware-express";
import { createHandler } from "graphql-http/lib/use/express";

import { schema } from "@src/graphql/schema";
// import { getSequelize } from "@src/database/init";
// import { syncAllModels, syncAllModelsForce } from "@src/database/utils";
import { syncAllModelsForce } from "@src/database/utils";
import { getMongo } from "@src/database/init";

import * as process from "process";

const main = () => {
  const app = express();
  app.use(cors());

  app.all("/graphql", createHandler({ schema }));
  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

  app.listen({ port: process.env.PORT ?? 4000 });
  console.log("Listening to port 4000");
};

const init_database = async () => {
  // const sequelize = getSequelize();

  // try {
  //   await sequelize.authenticate();
  //   if (process.env.FORCE) await syncAllModelsForce();
  //   else await syncAllModels();
  //   main();
  // } catch (e) {
  //   console.log("Could not connect to database", e);
  //   process.exit(1);
  // }

  try {
    await getMongo();
    if (process.env.FORCE) await syncAllModelsForce();
    main();
  } catch (e) {
    console.log("Could not connect to database", e);
    process.exit(1);
  }
};

init_database().then();
