import {controller, httpPost, request, response} from "inversify-express-utils";
import * as express from "express";
import {inject} from "inversify";
import TYPES from "../types";
import {IEarthquakeService} from "../services/earthquake/abstractions/IEarthquakeService";

@controller("/earthquake")
export class EarthquakeController {

    constructor(@inject(TYPES.IEarthquakeService) private readonly _earthquakeService: IEarthquakeService) {
    }
    @httpPost("/saveEarthquakeFeed")
    public async saveEarthquakeFeed (@request() req: express.Request, @response() res: express.Response) {
        try {
            await this._earthquakeService.saveEarthquakeFeed();
            res.status(200);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}