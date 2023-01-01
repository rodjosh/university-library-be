import "dotenv/config";
import express from "express";
import expressPlayground from "graphql-playground-middleware-express";
import { createHandler } from "graphql-http/lib/use/express";

import { schema } from "@src/graphql/schema";
import { getSequelize } from "@src/database/init";
import { syncAllModels, syncAllModelsForce } from "@src/database/utils";
import * as process from "process";

const main = () => {
  const app = express();
  app.all("/graphql", createHandler({ schema }));
  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

  app.listen({ port: process.env.PORT ?? 4000 });
  console.log("Listening to port 4000");
};

const init_database = async () => {
  const sequelize = getSequelize();

  try {
    await sequelize.authenticate();
    if (process.env.FORCE) await syncAllModelsForce();
    else await syncAllModels();
    main();
  } catch (e) {
    console.log("Could not connect to database", e);
    process.exit(1);
  }
};

init_database().then();
