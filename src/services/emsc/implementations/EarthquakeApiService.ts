import axios, { AxiosError } from "axios";
import { XMLParser } from "fast-xml-parser";
import { injectable } from "inversify";
import { Get, Route } from "tsoa";
import { IEarthquakeApiService } from "../abstractions/IEarthquakeApiService";
import { EarthquakeInfoDto } from "../dtos/EarthquakeInfoDto";

@Route("/api/emsc")
@injectable()
export class EarthquakeApiService implements IEarthquakeApiService{
  private static axios = axios.create({});
  @Get("/rssfeed")
  async getEarthquakeInfoFeed(): Promise<EarthquakeInfoDto[]> {
    try {
      EarthquakeApiService.axios.defaults.baseURL = process.env.EarthquakeApiUrl;
      const response = await EarthquakeApiService.axios.get<string>('/rss.php?typ=emsc&min_lat=10&min_long=-30&max_long=65');
      const parser = new XMLParser();
      const json = parser.parse(response.data);
      let earthquakeInfoDtoArray = new Array<EarthquakeInfoDto>();
      json.rss.channel.item.forEach((item: any) => {
        earthquakeInfoDtoArray.push(new EarthquakeInfoDto(item.title, item["geo:lat"], item["geo:long"], item["emsc:time"], item.link));
      });
      return earthquakeInfoDtoArray;
    } catch (e) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }
 
}