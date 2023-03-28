import * as express from 'express';
import { inject } from 'inversify';
import { interfaces, controller, httpGet, request, response } from "inversify-express-utils";
import { IEarthquakeApiService } from '../services/emsc/abstractions/IEarthquakeApiService';
import TYPES from '../types';

@controller("/emsc")
export class EmscController implements interfaces.Controller {

  constructor(@inject(TYPES.IEarthquakeApiService) private readonly _earthquakeApiService: IEarthquakeApiService) {
  }

  @httpGet("/rssFeed")
  public async getRssFeed (@request() req: express.Request, @response() res: express.Response) {
    try {
      const feed = await this._earthquakeApiService.getEarthquakeInfoFeed();
      res.status(200).json(feed);
    } catch(error) {
      res.status(400).json(error);
    }
  }
}