import {EarthquakeSearchResultDto} from "./EarthquakeSearchResultDto";

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