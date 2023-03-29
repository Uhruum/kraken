import {LocationDto} from "../dtos/LocationDto";

/**
 * Manages providing location data from reverse geocoding service
 */
export interface IReverseGeocodingService{
    /**
     * Fetches location data from reverse geocoding service
     * by latitude and longitude
     * @param longitude
     * @param latitude
     * @returns {@link Promise} of {@link LocationDto}
     */
    getLocationInfo(longitude:number, latitude:number): Promise<LocationDto>
}