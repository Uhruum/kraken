import {IReverseGeocodingService} from "../abstractions/IReverseGeocodingService";
import {LocationDto} from "../dtos/LocationDto";
import axios, { AxiosError } from "axios";
import {Get, Path, Route, Tags} from "tsoa";
import {injectable} from "inversify";

@Tags('Reverse Geocoding Service')
@Route("/api/reverseGeocoding")
@injectable()
export class ReverseGeocodingService implements IReverseGeocodingService {
    private static axios = axios.create({});

    @Get("/locationInfo/{longitude}/{latitude}")
    async getLocationInfo( @Path() longitude: number, @Path() latitude: number): Promise<LocationDto> {
        try {
            ReverseGeocodingService.axios.defaults.baseURL = process.env.BigDataCloudApiUrl;
            const response = await ReverseGeocodingService.axios.get<LocationDto>(`/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            return response.data as LocationDto;
        } catch (e) {
            const error = e as AxiosError;
            throw new Error(error.message);
        }
    }
}