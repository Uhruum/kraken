/**
 * Represents response from reverse geocoding service
 */
export class LocationDto{
    latitude:number;
    longitude:number;
    city:string;
    countryName:string;
    countryCode:string;
}