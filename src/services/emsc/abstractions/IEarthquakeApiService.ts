import { EarthquakeInfoDto } from "../dtos/EarthquakeInfoDto";

export interface IEarthquakeApiService{
  getEarthquakeInfoFeed(): Promise<EarthquakeInfoDto[]>;
}