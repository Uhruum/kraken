import "reflect-metadata";
import dotenv from 'dotenv';
import express from 'express';
import {InversifyExpressServer} from 'inversify-express-utils';
import morganBody from 'morgan-body';
import container from "./inversify.config";
import './presentation/EmscController';
import './presentation/ReverseGeocodingServiceController';
import './presentation/SchedulerController';
import swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import * as path from "path";
import process from "process";
import TYPES from "./types";
import {ISchedulerService} from "./services/schedulers/abstrations/ISchedulerService";
const swaggerDocument = require("./presentation/public/swagger.json");

dotenv.config();

const port = process.env.PORT;

const app = express();

const log = fs.createWriteStream(
    path.join(process.cwd(), "kraken.log"), { flags: "a"}
);
morganBody(app, {
    // .. other settings
    noColors: true,
    maxBodyLength: -1,
    stream: log,
});

let server =  new InversifyExpressServer(container, null, { rootPath: "/api" }, app);
server.setConfig((app) => {
  app.use(express.json());
  app.use(express.static("/src/presentation/public"));
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
});

server.setErrorConfig( (app) => {
  app.use( ( err : Error , request : express.Request , response : express.Response , next : express.NextFunction ) => {
      console.error( err.stack );
      response.status( 500 ).send( "Something broke!" );
      next();
  });
});

let appConfigured = server.build();
appConfigured.listen(port || 9000, () => console.log("Server is running on port", port));

if(process.env.RunSchedulersAtStart === "true"){
    const schedulerService = container.get<ISchedulerService>(TYPES.ISchedulerService);
    schedulerService.startSchedulers().then(r => {
        if(!r.isErrorThrown)
            console.log(r.message);
        else
            console.log(r.error.message);
    });
}