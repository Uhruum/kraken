import {controller, httpPost, request, response} from "inversify-express-utils";
import {inject} from "inversify";
import TYPES from "../types";
import {ISchedulerService} from "../services/schedulers/abstrations/ISchedulerService";
import * as express from "express";

@controller("/scheduler")
export class SchedulerController {
    constructor(@inject(TYPES.ISchedulerService) private readonly _schedulerService: ISchedulerService) {
    }

    @httpPost("/startSchedulers")
    public async startSchedulers (@request() req: express.Request, @response() res: express.Response) {
        try {
            const schedulerResultDto = await this._schedulerService.startSchedulers();
            res.status(200).json(schedulerResultDto);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/stopSchedulers")
    public async stopSchedulers (@request() req: express.Request, @response() res: express.Response) {
        try {
            const schedulerResultDto =  await this._schedulerService.stopSchedulers();
            res.status(200).json(schedulerResultDto);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/startSpecificScheduler")
    public async startSpecificScheduler (@request() req: express.Request, @response() res: express.Response) {
        try {
            const schedulerResultDto = await this._schedulerService.startSpecificScheduler(req.body);
            res.status(200).json(schedulerResultDto);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/stopSpecificScheduler")
    public async stopSpecificScheduler (@request() req: express.Request, @response() res: express.Response) {
        try {
            const schedulerResultDto = await this._schedulerService.stopSpecificScheduler(req.body);
            res.status(200).json(schedulerResultDto);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}