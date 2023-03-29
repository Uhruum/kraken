import {controller, httpPost, request, response} from "inversify-express-utils";
import {inject} from "inversify";
import TYPES from "../compositionRoot/types";
import {ISchedulerService} from "../services/schedulers/abstrations/ISchedulerService";
import * as express from "express";
import {ILogger} from "../services/logger/abstractions/ILogger";

@controller("/scheduler")
export class SchedulerController {
    constructor(@inject(TYPES.ISchedulerService) private readonly _schedulerService: ISchedulerService,
                @inject(TYPES.ILogger) private readonly _logger: ILogger) {
    }

    @httpPost("/startSchedulers")
    public async startSchedulers(@request() req: express.Request, @response() res: express.Response) {
        try {
            const schedulerResultDto = await this._schedulerService.startSchedulers();
            res.status(200).json(schedulerResultDto);
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            res.status(400).json(error);
        }
    }

    @httpPost("/stopSchedulers")
    public async stopSchedulers(@request() req: express.Request, @response() res: express.Response) {
        try {
            const schedulerResultDto = await this._schedulerService.stopSchedulers();
            res.status(200).json(schedulerResultDto);
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            res.status(400).json(error);
        }
    }

    @httpPost("/startSpecificScheduler")
    public async startSpecificScheduler(@request() req: express.Request, @response() res: express.Response) {
        try {
            const schedulerResultDto = await this._schedulerService.startSpecificScheduler(req.body);
            res.status(200).json(schedulerResultDto);
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            res.status(400).json(error);
        }
    }

    @httpPost("/stopSpecificScheduler")
    public async stopSpecificScheduler(@request() req: express.Request, @response() res: express.Response) {
        try {
            const schedulerResultDto = await this._schedulerService.stopSpecificScheduler(req.body);
            res.status(200).json(schedulerResultDto);
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            res.status(400).json(error);
        }
    }
}