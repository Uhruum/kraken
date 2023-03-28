import {IReverseGeocodingService} from "../abstractions/IReverseGeocodingService";
import {LocationDto} from "../dtos/LocationDto";
import axios, { AxiosError } from "axios";
import {Get, Path, Route, Tags} from "tsoa";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import {ILogger} from "../../logger/abstractions/ILogger";

@Tags('Reverse Geocoding Service')
@Route("/api/reverseGeocoding")
@injectable()
export class ReverseGeocodingService implements IReverseGeocodingService {
    private static axios = axios.create({});
    constructor(@inject(TYPES.ILogger) private readonly _logger: ILogger) {
    }

    @Get("/locationInfo/{longitude}/{latitude}")
    async getLocationInfo( @Path() longitude: number, @Path() latitude: number): Promise<LocationDto> {
        try {
            ReverseGeocodingService.axios.defaults.baseURL = process.env.BigDataCloudApiUrl;
            const response = await ReverseGeocodingService.axios.get<LocationDto>(`/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            return response.data as LocationDto;
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            throw error;
        }
    }
}