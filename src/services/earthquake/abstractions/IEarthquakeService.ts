import {EarthquakeSearchResultDto} from "../dtos/EarthquakeSearchResultDto";
import {EarthquakePaginatedSearchResultDto} from "../dtos/EarthquakePaginatedSearchResultDto";

export interface IEarthquakeService {
    saveEarthquakeFeed(): Promise<void>;

    getEarthquakeById(id: number): Promise<EarthquakeSearchResultDto>

    queryEarthquakes(page: number, rowsPerPage: number, byLatitude?: number, byLongitude?: number, byCountry?: string,
                     byYear?: number, inLastDays?: number, inLastHours?: number, byMagnitude?: number): Promise<EarthquakePaginatedSearchResultDto>
}