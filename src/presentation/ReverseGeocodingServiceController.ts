import {controller, httpGet, interfaces, requestParam, response} from "inversify-express-utils";
import {inject} from "inversify";
import TYPES from "../compositionRoot/types";
import * as express from "express";
import {IReverseGeocodingService} from "../services/reverseGeocoding/abstractions/IReverseGeocodingService";
import {ILogger} from "../services/logger/abstractions/ILogger";

@controller("/reverseGeocoding")
export class ReverseGeocodingServiceController implements interfaces.Controller {

    constructor(@inject(TYPES.IReverseGeocodingService) private readonly _reverseGeocodingService: IReverseGeocodingService,
                @inject(TYPES.ILogger) private readonly _logger: ILogger) {
    }

    @httpGet("/locationInfo/:longitude/:latitude")
    public async getLocationInfo(@requestParam("longitude") longitude: number,
                                 @requestParam("latitude") latitude: number,
                                 @response() res: express.Response) {
        try {
            const feed = await this._reverseGeocodingService.getLocationInfo(longitude, latitude);
            res.status(200).json(feed);
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            res.status(400).json(error);
        }
    }
}