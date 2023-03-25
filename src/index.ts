import "reflect-metadata";
import dotenv from 'dotenv';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from "./inversify.config";
import './presentation/EmscController';
import morgan from "morgan";

dotenv.config();

const port = process.env.PORT;

const app = express();

let server =  new InversifyExpressServer(container, null, { rootPath: "/api" }, app);
server.setConfig((app) => {
  app.use(express.json());
  app.use(morgan("combined"));
  app.use(express.static("public"));
});
let appConfigured = server.build();
appConfigured.listen(port || 9000, () => console.log("Server is running on port", port));

