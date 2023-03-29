import {EarthquakeSearchResultDto} from "../dtos/EarthquakeSearchResultDto";
import {EarthquakePaginatedSearchResultDto} from "../dtos/EarthquakePaginatedSearchResultDto";

export interface IEarthquakeService {
    saveEarthquakeFeed() : Promise<void>;
    getEarthquakeById(id:number): Promise<EarthquakeSearchResultDto>
    getAllEarthquakes(page: number, rowsPerPage: number): Promise<EarthquakePaginatedSearchResultDto>
}