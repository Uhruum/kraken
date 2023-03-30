import {ILocationMapper} from "../abstractions/ILocationMapper";
import {LocationDto} from "../../reverseGeocoding/dtos/LocationDto";
import {injectable} from "inversify";
import {Location} from "../../../domain/entities/Location";
@injectable()
export class LocationMapper implements ILocationMapper{
    public mapLocationDtoToLocation(locationDto: LocationDto , location: Location | null): Location {
        if(location === null)
            location = new Location();

        location.country = locationDto.countryName;
        location.countryCode = locationDto.countryCode;
        location.latitude = locationDto.latitude;
        location.longitude = locationDto.longitude;
        location.city = locationDto.city;
        return location;
    }

}

