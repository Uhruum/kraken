import {IEarthquakeMapper} from "../abstractions/IEarthquakeMapper";
import {Earthquake} from "../../../domain/entities/Earthquake";
import {EarthquakeSearchResultDto} from "../dtos/EarthquakeSearchResultDto";
import {injectable} from "inversify";

@injectable()
export class EarthquakeMapper implements IEarthquakeMapper{
    mapEarthquakeArrayToEarthquakeSearchResultDtoArray(earthquakes: Earthquake[]): EarthquakeSearchResultDto[] {
        let earthquakeSearchResultDtos = new Array<EarthquakeSearchResultDto>();
        for (const earthquake of earthquakes) {
            earthquakeSearchResultDtos.push(this.mapEarthquakeToEarthquakeSearchResultDto(earthquake));
        }
        return earthquakeSearchResultDtos;
    }

    mapEarthquakeToEarthquakeSearchResultDto(earthquake: Earthquake): EarthquakeSearchResultDto {
        return new EarthquakeSearchResultDto(earthquake.id, earthquake.title,
            earthquake.magnitude, earthquake.time, earthquake.location.latitude,
            earthquake.location.longitude, earthquake.location.city, earthquake.location.country);
    }

}