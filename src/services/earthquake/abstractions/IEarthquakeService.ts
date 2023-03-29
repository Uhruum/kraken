import {EarthquakeSearchResultDto} from "../dtos/EarthquakeSearchResultDto";
import {EarthquakePaginatedSearchResultDto} from "../dtos/EarthquakePaginatedSearchResultDto";

/**
 * Manages main business logic of application.
 * Provides business logic for filtering and acquiring data about earthquakes.
 */
export interface IEarthquakeService {
    /**
     * Acquires earthquake and location data.
     * According to the database insert or updates the same.
     */
    saveEarthquakeFeed(): Promise<void>;

    /**
     * Provides data about specific earthquake.
     * @param id
     * @returns {@link Promise} of {@link EarthquakeSearchResultDto}
     * @throws {@link EarthquakeNotFoundError}
     */
    getEarthquakeById(id: number): Promise<EarthquakeSearchResultDto>

    /**
     * Filters database by specific parameters
     * @param page - represents page number of paginated result
     * @param rowsPerPage - defines number of records per page
     * @param byLatitude
     * @param byLongitude
     * @param byCountry
     * @param byYear
     * @param inLastDays
     * @param inLastHours
     * @param byMagnitude
     * @returns {@link Promise} of {@link EarthquakePaginatedSearchResultDto}
     */
    queryEarthquakes(page: number, rowsPerPage: number, byLatitude?: number, byLongitude?: number, byCountry?: string,
                     byYear?: number, inLastDays?: number, inLastHours?: number, byMagnitude?: number): Promise<EarthquakePaginatedSearchResultDto>
}