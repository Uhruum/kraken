import axios from "axios";
import {XMLParser} from "fast-xml-parser";
import {inject, injectable} from "inversify";
import {Get, Route, Tags} from "tsoa";
import {IEarthquakeApiService} from "../abstractions/IEarthquakeApiService";
import {EarthquakeInfoDto} from "../dtos/EarthquakeInfoDto";
import TYPES from "../../../compositionRoot/types";
import {ILogger} from "../../logger/abstractions/ILogger";

@Tags('Earthquake Api Service')
@Route("/api/emsc")
@injectable()
export class EarthquakeApiService implements IEarthquakeApiService {
    private static axios = axios.create({});
    private readonly _geoLat: string = "geo:lat";
    private readonly _geoLong: string = "geo:long";
    private readonly _emscTime: string = "emsc:time";
    private readonly _emscMagnitude:string = "emsc:magnitude"

    constructor(@inject(TYPES.ILogger) private readonly _logger: ILogger) {
    }

    @Get("/rssFeed")
    async getEarthquakeInfoFeed(): Promise<EarthquakeInfoDto[]> {
        try {
            EarthquakeApiService.axios.defaults.baseURL = process.env.EarthquakeApiUrl;
            const response = await EarthquakeApiService.axios.get<string>(`${process.env.EuroMediterianRegionSearchUrl}`);
            const parser = new XMLParser();
            const json = parser.parse(response.data);
            let earthquakeInfoDtoArray = new Array<EarthquakeInfoDto>();
            json.rss.channel.item.forEach((item: any) => {
                earthquakeInfoDtoArray.push(new EarthquakeInfoDto(item.title, item[this._geoLat], item[this._geoLong], item[this._emscTime], item.link,item[this._emscMagnitude]));
            });
            return earthquakeInfoDtoArray;
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            throw error;
        }
    }

}