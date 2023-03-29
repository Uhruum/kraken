import { EarthquakeInfoDto } from "../dtos/EarthquakeInfoDto";

/**
 * Manages providing earthquake data from emsc
 */
export interface IEarthquakeApiService{
  /**
   * Provides data from emsc rss feed api
   * @returns {@link Promise} of {@link EarthquakeInfoDto[]}
   * @throws {@link Error}
   */
  getEarthquakeInfoFeed(): Promise<EarthquakeInfoDto[]>;
}