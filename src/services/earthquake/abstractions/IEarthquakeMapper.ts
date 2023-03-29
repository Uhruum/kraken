import {Earthquake} from "../../../domain/entities/Earthquake";
import {EarthquakeSearchResultDto} from "../dtos/EarthquakeSearchResultDto";

export interface IEarthquakeMapper {
    mapEarthquakeToEarthquakeSearchResultDto(earthquake: Earthquake): EarthquakeSearchResultDto
    mapEarthquakeArrayToEarthquakeSearchResultDtoArray(earthquakes: Earthquake[]): EarthquakeSearchResultDto[]
}