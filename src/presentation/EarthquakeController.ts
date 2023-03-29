import {controller, httpGet, httpPost, queryParam, request, requestParam, response} from "inversify-express-utils";
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

    @httpGet("/getEarthquakeById/:id")
    public async getEarthquakeById (@request() req: express.Request,@requestParam("id") id: number, @response() res: express.Response) {
        try {
            const earthquakeSearchResultDto = await this._earthquakeService.getEarthquakeById(id);
            res.status(200).json(earthquakeSearchResultDto);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/getAllEarthquakes/:page/:rowsPerPage")
    public async getAllEarthquakes (@request() req: express.Request,
                                    @requestParam("page") page: number,
                                    @requestParam("rowsPerPage") rowsPerPage: number,
                                    @response() res: express.Response) {
        try {
            const earthquakeSearchResultDto = await this._earthquakeService.getAllEarthquakes(page, rowsPerPage);
            res.status(200).json(earthquakeSearchResultDto);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}