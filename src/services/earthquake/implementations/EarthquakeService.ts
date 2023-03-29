import {IEarthquakeService} from "../abstractions/IEarthquakeService";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import {IDatabaseService} from "../../../domain/IDatabaseService";
import {ILogger} from "../../logger/abstractions/ILogger";
import {IEarthquakeApiService} from "../../emsc/abstractions/IEarthquakeApiService";
import {ILocationService} from "../../location/abstractions/ILocationService";
import {Earthquake} from "../../../domain/entities/Earthquake";
import {Get, Path, Post, Route, Tags} from "tsoa";
import * as util from "util";
import {EarthquakeSearchResultDto} from "../dtos/EarthquakeSearchResultDto";
import {EarthquakeNotFoundError} from "../errors/EarthquakeNotFoundError";
import {EarthquakePaginatedSearchResultDto} from "../dtos/EarthquakePaginatedSearchResultDto";

@Tags('Earthquake Service')
@Route("/api/earthquake")
@injectable()
export class EarthquakeService implements IEarthquakeService {

    constructor(@inject(TYPES.IEarthquakeApiService) private readonly _earthquakeApiService: IEarthquakeApiService,
                @inject(TYPES.ILocationService) private readonly _locationService: ILocationService,
                @inject(TYPES.IDatabaseService) private readonly _database: IDatabaseService,
                @inject(TYPES.ILogger) private readonly _logger: ILogger) {
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
                let earthquake = await queryRunner.manager.findOneBy(Earthquake, {id: id});

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
        const datasource = await this._database.getDataSource();
        const earthquakeRepository = datasource.getRepository(Earthquake);
        const earthquake = await earthquakeRepository.findOneBy({id: id});
        if (earthquake != null)
            return new EarthquakeSearchResultDto(earthquake.id, earthquake.title,
                earthquake.magnitude, earthquake.time, earthquake.location.latitude,
                earthquake.location.longitude, earthquake.location.city, earthquake.location.country);

        throw new EarthquakeNotFoundError(`Could not find earthquake with id: ${id}`);
    }
    @Get("/getAllEarthquakes/{page}/{rowsPerPage}")
    public async getAllEarthquakes(@Path() page: number, @Path() rowsPerPage: number): Promise<EarthquakePaginatedSearchResultDto>{
        const datasource = await this._database.getDataSource();
        const earthquakeRepository = datasource.getRepository(Earthquake);
        const [earthquakes, count] = await earthquakeRepository.findAndCount({
            order: { id: "DESC", },
            skip: rowsPerPage,
            take: page,
        });

        if(count == 0)
            return new EarthquakePaginatedSearchResultDto(new Array<EarthquakeSearchResultDto>(), count, count);
        let earthquakeSearchResultDtos = new Array<EarthquakeSearchResultDto>();
        for (const earthquake of earthquakes){
            earthquakeSearchResultDtos.push(new EarthquakeSearchResultDto(earthquake.id, earthquake.title,
                earthquake.magnitude, earthquake.time, earthquake.location.latitude,
                earthquake.location.longitude, earthquake.location.city, earthquake.location.country));
        }
        const pagesCount=  rowsPerPage > count ? 1 :  count/rowsPerPage;
        return new EarthquakePaginatedSearchResultDto(earthquakeSearchResultDtos,count,pagesCount);
    }

}