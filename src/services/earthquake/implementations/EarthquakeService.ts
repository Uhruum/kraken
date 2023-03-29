import {IEarthquakeService} from "../abstractions/IEarthquakeService";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import {IDatabaseService} from "../../../domain/IDatabaseService";
import {ILogger} from "../../logger/abstractions/ILogger";
import {IEarthquakeApiService} from "../../emsc/abstractions/IEarthquakeApiService";
import {ILocationService} from "../../location/abstractions/ILocationService";
import {Earthquake} from "../../../domain/entities/Earthquake";
import {Get, Path, Post, Query, Route, Tags} from "tsoa";
import * as util from "util";
import {EarthquakeSearchResultDto} from "../dtos/EarthquakeSearchResultDto";
import {EarthquakeNotFoundError} from "../errors/EarthquakeNotFoundError";
import {EarthquakePaginatedSearchResultDto} from "../dtos/EarthquakePaginatedSearchResultDto";
import {IEarthquakeQueryProvider} from "../abstractions/IEarthquakeQueryProvider";
import {IEarthquakeMapper} from "../abstractions/IEarthquakeMapper";

@Tags('Earthquake Service')
@Route("/api/earthquake")
@injectable()
export class EarthquakeService implements IEarthquakeService {

    constructor(@inject(TYPES.IEarthquakeApiService) private readonly _earthquakeApiService: IEarthquakeApiService,
                @inject(TYPES.ILocationService) private readonly _locationService: ILocationService,
                @inject(TYPES.IDatabaseService) private readonly _database: IDatabaseService,
                @inject(TYPES.ILogger) private readonly _logger: ILogger,
                @inject(TYPES.IEarthquakeQueryProvider) private readonly _earthquakeQueryProvider: IEarthquakeQueryProvider,
                @inject(TYPES.IEarthquakeMapper) private readonly _earthquakeMapper: IEarthquakeMapper) {
    }

    @Post("/saveEarthquakeFeed")
    public async saveEarthquakeFeed(): Promise<void> {
        const datasource = await this._database.getDataSource();
        const queryRunner = datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            this._logger.log("INFO", "Calling getEarthquakeInfoFeed!");
            const earthquakesDtos = await this._earthquakeApiService.getEarthquakeInfoFeed();
            let earthquakes = new Array<Earthquake>();
            this._logger.log("INFO", "Finished calling getEarthquakeInfoFeed!");
            for (const earthquakeDto of earthquakesDtos) {

                const id = Number(earthquakeDto.link.split("?id=")[1]);
                const magnitude = Number(earthquakeDto.magnitude.split(" ")[1]);
                let earthquake = await queryRunner.manager.findOne(Earthquake,
                    {
                        where: {id: id},
                        relations: {location: true}
                    });

                if (earthquake === null)
                    earthquake = new Earthquake();

                earthquake.id = id;
                earthquake.title = earthquakeDto.title;
                earthquake.time = earthquakeDto.time;
                earthquake.magnitude = magnitude;
                this._logger.log("DEBUG", `getLocation for earthquake - id: ${id} `);
                earthquake.location = await this._locationService.getLocation(earthquakeDto.lat, earthquakeDto.long);
                this._logger.log("DEBUG", `finished getLocation for earthquake - id: ${id} `);
                earthquakes.push(earthquake);
            }
            this._logger.log("DEBUG", `earthquakes for save : ${util.inspect(earthquakes)} `);
            await queryRunner.manager.save(earthquakes);
            await queryRunner.commitTransaction();
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    @Get("/getEarthquakeById/{id}")
    public async getEarthquakeById(@Path() id: number): Promise<EarthquakeSearchResultDto> {
        let earthquakeQb = await this._earthquakeQueryProvider.provideEarthquakeQueryBuilder();
        earthquakeQb = this._earthquakeQueryProvider.provideQueryGetEarthquakesById(earthquakeQb, id);
        const earthquake = await earthquakeQb.getOne();
        if (earthquake != null)
            return this._earthquakeMapper.mapEarthquakeToEarthquakeSearchResultDto(earthquake);

        throw new EarthquakeNotFoundError(`Could not find earthquake with id: ${id}`);
    }

    @Get("/queryEarthquakes")
    public async queryEarthquakes(
        @Query("page") page: number, @Query("rowsPerPage") rowsPerPage: number,
        @Query("byLatitude") byLatitude?: number, @Query("byLongitude") byLongitude?: number,
        @Query("byCountry") byCountry?: string, @Query("byYear") byYear?: number,
        @Query("inLastDays") inLastDays?: number, @Query("inLastHours") inLastHours?: number,
        @Query("byMagnitude") byMagnitude?: number): Promise<EarthquakePaginatedSearchResultDto> {

        let earthquakeQb = await this._earthquakeQueryProvider.provideEarthquakeQueryBuilder();
        earthquakeQb = this._earthquakeQueryProvider.provideQueryFindAllEarthquakesByLatAndLong(earthquakeQb, byLatitude, byLongitude);
        earthquakeQb = this._earthquakeQueryProvider.provideQueryFindAllEarthquakesByCountry(earthquakeQb, byCountry);
        earthquakeQb = this._earthquakeQueryProvider.provideQueryFindAllEarthquakesByYear(earthquakeQb, byYear);
        earthquakeQb = this._earthquakeQueryProvider.provideQueryFindAllEarthquakesInLastDays(earthquakeQb, inLastDays);
        earthquakeQb = this._earthquakeQueryProvider.provideQueryFindAllEarthquakesInLastHours(earthquakeQb, inLastHours);
        earthquakeQb = this._earthquakeQueryProvider.provideQueryFindAllEarthquakesByMagnitude(earthquakeQb, byMagnitude);
        const [earthquakes, count] = await earthquakeQb
            .orderBy("quake.id", "DESC")
            .skip(page * rowsPerPage)
            .take(rowsPerPage)
            .getManyAndCount();

        if (count == 0)
            return new EarthquakePaginatedSearchResultDto(new Array<EarthquakeSearchResultDto>(), count, count);

        const pagesCount = rowsPerPage > count ? 0 : Math.round((count / rowsPerPage) - 1);
        return new EarthquakePaginatedSearchResultDto(this._earthquakeMapper.mapEarthquakeArrayToEarthquakeSearchResultDtoArray(earthquakes), count, pagesCount);
    }

}