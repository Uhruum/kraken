import axios, { AxiosError } from "axios";
import { XMLParser } from "fast-xml-parser";
import { injectable } from "inversify";
import {Get, Route, Tags} from "tsoa";
import { IEarthquakeApiService } from "../abstractions/IEarthquakeApiService";
import { EarthquakeInfoDto } from "../dtos/EarthquakeInfoDto";
@Tags('Earthquake Api Service')
@Route("/api/emsc")
@injectable()
export class EarthquakeApiService implements IEarthquakeApiService{
  private static axios = axios.create({});
  private readonly _geoLat:string = "geo:lat";
  private readonly _geoLong:string = "geo:long";
  private readonly _emscTime:string = "emsc:time";

  @Get("/rssFeed")
  async getEarthquakeInfoFeed(): Promise<EarthquakeInfoDto[]> {
    try {
      EarthquakeApiService.axios.defaults.baseURL = process.env.EarthquakeApiUrl;
      const response = await EarthquakeApiService.axios.get<string>(`${ process.env.EuroMediterianRegionSearchUrl }`);
      const parser = new XMLParser();
      const json = parser.parse(response.data);
      let earthquakeInfoDtoArray = new Array<EarthquakeInfoDto>();
      json.rss.channel.item.forEach((item: any) => {
        earthquakeInfoDtoArray.push(new EarthquakeInfoDto(item.title, item[this._geoLat], item[this._geoLong], item[this._emscTime], item.link));
      });
      return earthquakeInfoDtoArray;
    } catch (e) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }
 
}