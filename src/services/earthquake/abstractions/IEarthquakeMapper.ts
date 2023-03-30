import {Earthquake} from "../../../domain/entities/Earthquake";
import {EarthquakeSearchResultDto} from "../dtos/EarthquakeSearchResultDto";
import {EarthquakeInfoDto} from "../../emsc/dtos/EarthquakeInfoDto";
import {Location} from "../../../domain/entities/Location";

/**
 * Map one object to another.
 * In this case map every entity or dto for {@link IEarthquakeService}
 */
export interface IEarthquakeMapper {
    /**
     * Maps earthquake entity to a EarthquakeSearchResultDto
     * @param earthquake {@link Earthquake}
     * @returns {@link EarthquakeSearchResultDto}
     */
    mapEarthquakeToEarthquakeSearchResultDto(earthquake: Earthquake): EarthquakeSearchResultDto

    /**
     * Maps array of earthquake entity to an array of EarthquakeSearchResultDto
     * @param earthquakes {@link Earthquake}
     * @returns {@link EarthquakeSearchResultDto[]}
     */
    mapEarthquakeArrayToEarthquakeSearchResultDtoArray(earthquakes: Earthquake[]): EarthquakeSearchResultDto[]

    /**
     * Maps EarthquakeInfoDto to earthquake entity
     * @param earthquakeDto
     * @param id
     * @param magnitude
     * @param location - location entity
     * @param earthquake -earthquake entity
     * @returns {@link Earthquake}
     */
    mapEarthquakeInfoDtoToEarthquake(earthquakeDto: EarthquakeInfoDto, id: number, magnitude: number,
                                     location: Location, earthquake: Earthquake | null): Earthquake
}