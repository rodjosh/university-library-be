import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

import { schema } from "@src/graphql/schema";

const app = express();
app.all("/graphql", createHandler({ schema }));

app.listen({ port: process.env.PORT ?? 4000 });
console.log("Listening to port 4000");
