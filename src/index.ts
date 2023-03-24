import "reflect-metadata";
import dotenv from 'dotenv';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from "./inversify.config";
import * as bodyParser from 'body-parser';
import './presentation/EmscController';

dotenv.config();

const port = process.env.PORT;

const app = express();

let server =  new InversifyExpressServer(container, null, { rootPath: "/api" }, app);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});
let appConfigured = server.build();
appConfigured.listen(port || 9000, () => `App running on ${port}`);

