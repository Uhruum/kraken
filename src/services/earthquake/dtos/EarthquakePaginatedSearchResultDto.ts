import {EarthquakeSearchResultDto} from "./EarthquakeSearchResultDto";
/**
 * Data transfer object which represents
 * result of filtering earthquakes by specific parameters.
 */
export class EarthquakePaginatedSearchResultDto{
    constructor(data: EarthquakeSearchResultDto[], totalCount: number, pagesCount: number) {
        this.data = data;
        this.totalCount = totalCount;
        this.pagesCount = pagesCount;
    }
    data : EarthquakeSearchResultDto[]
    totalCount: number
    pagesCount: number
}