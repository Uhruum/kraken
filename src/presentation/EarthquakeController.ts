import {controller, httpGet, httpPost, queryParam, request, requestParam, response} from "inversify-express-utils";
import * as express from "express";
import {inject} from "inversify";
import TYPES from "../types";
import {IEarthquakeService} from "../services/earthquake/abstractions/IEarthquakeService";
import {ILogger} from "../services/logger/abstractions/ILogger";

@controller("/earthquake")
export class EarthquakeController {

    constructor(@inject(TYPES.IEarthquakeService) private readonly _earthquakeService: IEarthquakeService,
                @inject(TYPES.ILogger) private readonly _logger: ILogger) {
    }

    @httpPost("/saveEarthquakeFeed")
    public async saveEarthquakeFeed(@request() req: express.Request, @response() res: express.Response) {
        try {
            await this._earthquakeService.saveEarthquakeFeed();
            res.status(200);
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            res.status(400).json(error);
        }
    }

    @httpGet("/getEarthquakeById/:id")
    public async getEarthquakeById(@request() req: express.Request, @requestParam("id") id: number, @response() res: express.Response) {
        try {
            this._logger.log("INFO", `Called ${EarthquakeController.name} getEarthquakeById: ${id}`);
            const earthquakeSearchResultDto = await this._earthquakeService.getEarthquakeById(id);
            res.status(200).json(earthquakeSearchResultDto);
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            res.status(400).json(error);
        }
    }

    @httpGet("/queryEarthquakes")
    public async queryEarthquakes(@response() res: express.Response,@queryParam("page") page: number, @queryParam("rowsPerPage") rowsPerPage: number,
                                  @queryParam("byLatitude") byLatitude?: number, @queryParam("byLongitude") byLongitude?: number,
                                  @queryParam("byCountry") byCountry?: string, @queryParam("byYear") byYear?: number,
                                  @queryParam("inLastDays") inLastDays?: number, @queryParam("inLastHours") inLastHours?: number,
                                  @queryParam("byMagnitude") byMagnitude?: number
    ) {
        try {
            this._logger.log("INFO", `Called ${EarthquakeController.name} queryEarthquakes: page: ${page}, rowsPerPage: ${rowsPerPage}, byLatitude: ${byLatitude} 
            ,byLongitude: ${byLongitude} ,byCountry: ${byCountry} ,byYear: ${byCountry} , inLastDays: ${byCountry}, inLastHours: ${inLastHours}`);
            const earthquakeSearchResultDto = await this._earthquakeService.queryEarthquakes(page,rowsPerPage,byLatitude, byLongitude, byCountry,
                byYear, inLastDays, inLastHours, byMagnitude);
            res.status(200).json(earthquakeSearchResultDto);
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            res.status(400).json(error);
        }
    }
}