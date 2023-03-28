import {controller, httpGet, interfaces, request, requestParam, response} from "inversify-express-utils";
import {inject} from "inversify";
import TYPES from "../types";
import * as express from "express";
import {IReverseGeocodingService} from "../services/reverseGeocoding/abstractions/IReverseGeocodingService";

@controller("/reverseGeocoding")
export class ReverseGeocodingServiceController implements interfaces.Controller {

    constructor(@inject(TYPES.IReverseGeocodingService) private readonly _reverseGeocodingService: IReverseGeocodingService) {
    }

    @httpGet("/locationInfo/:longitude/:latitude")
    public async getLocationInfo (@requestParam("longitude") longitude: number,
                                  @requestParam("latitude") latitude: number,
                                  @response() res: express.Response) {
        try {
            const feed = await this._reverseGeocodingService.getLocationInfo(longitude, latitude);
            res.status(200).json(feed);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}