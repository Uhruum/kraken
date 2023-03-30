import {IEarthquakeMapper} from "../abstractions/IEarthquakeMapper";
import {Earthquake} from "../../../domain/entities/Earthquake";
import {EarthquakeSearchResultDto} from "../dtos/EarthquakeSearchResultDto";
import {injectable} from "inversify";
import {EarthquakeInfoDto} from "../../emsc/dtos/EarthquakeInfoDto";
import {Location} from "../../../domain/entities/Location";

@injectable()
export class EarthquakeMapper implements IEarthquakeMapper {
    public mapEarthquakeArrayToEarthquakeSearchResultDtoArray(earthquakes: Earthquake[]): EarthquakeSearchResultDto[] {
        let earthquakeSearchResultDtos = new Array<EarthquakeSearchResultDto>();
        for (const earthquake of earthquakes) {
            earthquakeSearchResultDtos.push(this.mapEarthquakeToEarthquakeSearchResultDto(earthquake));
        }
        return earthquakeSearchResultDtos;
    }

    public mapEarthquakeToEarthquakeSearchResultDto(earthquake: Earthquake): EarthquakeSearchResultDto {
        return new EarthquakeSearchResultDto(earthquake.id, earthquake.title,
            earthquake.magnitude, earthquake.time, earthquake.location.latitude,
            earthquake.location.longitude, earthquake.location.city, earthquake.location.country);
    }

    public mapEarthquakeInfoDtoToEarthquake(earthquakeDto: EarthquakeInfoDto, id: number, magnitude: number,
                                            location: Location, earthquake: Earthquake | null): Earthquake {
        if (earthquake === null)
            earthquake = new Earthquake();

        earthquake.id = id;
        earthquake.title = earthquakeDto.title;
        earthquake.time = earthquakeDto.time;
        earthquake.magnitude = magnitude;
        earthquake.location = location
        return earthquake;
    }

}