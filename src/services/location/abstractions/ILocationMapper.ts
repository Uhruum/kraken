import {LocationDto} from "../../reverseGeocoding/dtos/LocationDto";
import {Location} from "../../../domain/entities/Location";
/**
 * Map one object to another.
 * In this case map every entity or dto for {@link ILocationService}
 */
export interface ILocationMapper {
    /**
     * Maps LocationDto to Location entity
     * @param locationDto
     * @param location
     * @returns {@link Location}
     */
    mapLocationDtoToLocation(locationDto:LocationDto, location: Location | null) : Location
}