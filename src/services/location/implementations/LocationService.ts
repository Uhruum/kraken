import {ILocationService} from "../abstractions/ILocationService";
import {inject, injectable} from "inversify";
import TYPES from "../../../compositionRoot/types";
import {IReverseGeocodingService} from "../../reverseGeocoding/abstractions/IReverseGeocodingService";
import {IDatabaseService} from "../../../domain/IDatabaseService";
import {ILogger} from "../../logger/abstractions/ILogger";
import {Location} from "../../../domain/entities/Location";
import {ILocationMapper} from "../abstractions/ILocationMapper";

@injectable()
export class LocationService implements ILocationService {

    constructor(@inject(TYPES.IReverseGeocodingService) private readonly _reverseGeocodingService: IReverseGeocodingService,
                @inject(TYPES.IDatabaseService) private readonly _database: IDatabaseService,
                @inject(TYPES.ILogger) private readonly _logger: ILogger,
                @inject(TYPES.ILocationMapper) private readonly _locationMapper: ILocationMapper) {
    }

    public async getLocation(latitude: number, longitude: number): Promise<Location> {
        const datasource = await this._database.getDataSource();
        const locationRepository = datasource.getRepository(Location);
        try {
            this._logger.log("INFO", `getLocation for earthquake - latitude: ${latitude}, latitude: ${longitude} `);
            let location = await locationRepository.findOneBy({latitude: latitude, longitude: longitude});
            const locationDto = await this._reverseGeocodingService.getLocationInfo(longitude, latitude);
            return this._locationMapper.mapLocationDtoToLocation(locationDto,location);
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            throw  error;
        }
    }
}