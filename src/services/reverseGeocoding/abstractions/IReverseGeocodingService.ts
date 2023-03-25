import {LocationDto} from "../dtos/LocationDto";

export interface IReverseGeocodingService{
    getLocationInfo(longitude:number, latitude:number): Promise<LocationDto>
}