import {ILocationService} from "../abstractions/ILocationService";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import {IReverseGeocodingService} from "../../reverseGeocoding/abstractions/IReverseGeocodingService";
import {IDatabaseService} from "../../../domain/IDatabaseService";
import {ILogger} from "../../logger/abstractions/ILogger";
import {Location} from "../../../domain/entities/Location";

@injectable()
export class LocationService implements ILocationService {

    constructor(@inject(TYPES.IReverseGeocodingService) private readonly _reverseGeocodingService: IReverseGeocodingService,
                @inject(TYPES.IDatabaseService) private readonly _database: IDatabaseService,
                @inject(TYPES.ILogger) private readonly _logger: ILogger) {
    }

    public async getLocation(latitude: number, longitude: number): Promise<Location> {
        const datasource = await this._database.getDataSource();
        const queryRunner = datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            this._logger.log("INFO", `getLocation for earthquake - latitude: ${latitude}, latitude: ${longitude} `);
            let location = await queryRunner.manager.findOneBy(Location, {latitude: latitude, longitude: longitude});
            if (location !== null)
                return location;
            const locationDto = await this._reverseGeocodingService.getLocationInfo(longitude, latitude);

            location = new Location();
            location.country = locationDto.countryName;
            location.countryCode = locationDto.countryCode;
            location.latitude = locationDto.latitude;
            location.longitude = locationDto.longitude;
            location.city = locationDto.city;

            const newLocation = await queryRunner.manager.save(location);
            await queryRunner.commitTransaction();
            this._logger.log("INFO", `Location saved - latitude: ${latitude}, latitude: ${longitude} `);
            return newLocation;
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            await queryRunner.rollbackTransaction();
            throw  error;
        } finally {
            await queryRunner.release();
        }
    }
}