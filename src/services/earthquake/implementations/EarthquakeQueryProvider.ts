import {IEarthquakeQueryProvider} from "../abstractions/IEarthquakeQueryProvider";
import {Brackets, SelectQueryBuilder} from "typeorm";
import {Earthquake} from "../../../domain/entities/Earthquake";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import {IDatabaseService} from "../../../domain/IDatabaseService";

@injectable()
export class EarthquakeQueryProvider implements IEarthquakeQueryProvider {

    constructor(@inject(TYPES.IDatabaseService) private readonly _database: IDatabaseService) {
    }
    public async provideEarthquakeQueryBuilder(): Promise<SelectQueryBuilder<Earthquake>> {
        const datasource = await this._database.getDataSource();
        const earthquakeRepository = datasource.getRepository(Earthquake);
        return  earthquakeRepository.createQueryBuilder('quake')
            .leftJoinAndSelect('quake.location', 'l');
    }

    public provideQueryGetEarthquakesById(earthquakeQb: SelectQueryBuilder<Earthquake>, id: number): SelectQueryBuilder<Earthquake> {
        return earthquakeQb.andWhere("quake.id = :id", {id: id});
    }

    public provideQueryFindAllEarthquakesByCountry(earthquakeQb: SelectQueryBuilder<Earthquake>, byCountry?: string): SelectQueryBuilder<Earthquake> {
        if (byCountry === undefined)
            return earthquakeQb;

        return earthquakeQb.andWhere("l.country = :byCountry", {byCountry: byCountry});
    }

    public provideQueryFindAllEarthquakesByLatAndLong(earthquakeQb: SelectQueryBuilder<Earthquake>, byLatitude?: number, byLongitude?: number): SelectQueryBuilder<Earthquake> {
        if (byLatitude === undefined || byLongitude === undefined)
            return earthquakeQb;

        return earthquakeQb.andWhere(new Brackets((qb) => {
            qb.where("l.latitude = :byLatitude ", {byLatitude: byLatitude})
                .andWhere("l.longitude = :byLongitude", {byLongitude: byLongitude})
        }));
    }

    public provideQueryFindAllEarthquakesByMagnitude(earthquakeQb: SelectQueryBuilder<Earthquake>, byMagnitude?: number): SelectQueryBuilder<Earthquake> {
        if (byMagnitude === undefined)
            return earthquakeQb;

        return earthquakeQb.andWhere("quake.magnitude = :byMagnitude", {byMagnitude: byMagnitude});
    }

    public provideQueryFindAllEarthquakesByYear(earthquakeQb: SelectQueryBuilder<Earthquake>, byYear?: number): SelectQueryBuilder<Earthquake> {
        if (byYear === undefined)
            return earthquakeQb;

        const firstDay = new Date(byYear, 0, 1);
        const lastDay = new Date(byYear, 11, 31);
        return earthquakeQb.andWhere(new Brackets((qb) => {
            qb.where("quake.time >= :firstDay ", {firstDay: firstDay})
                .andWhere("quake.time <= :lastDay", {lastDay: lastDay})
        }));
    }

    public provideQueryFindAllEarthquakesInLastDays(earthquakeQb: SelectQueryBuilder<Earthquake>, inLastDays?: number): SelectQueryBuilder<Earthquake> {
        if (inLastDays === undefined)
            return earthquakeQb;

        let d = new Date();
        d.setDate(d.getDate() - inLastDays);

        return earthquakeQb.andWhere("quake.time >= :inLastDays", {inLastDays: d});
    }

    public provideQueryFindAllEarthquakesInLastHours(earthquakeQb: SelectQueryBuilder<Earthquake>, inLastHours?: number): SelectQueryBuilder<Earthquake> {
        if (inLastHours === undefined)
            return earthquakeQb;

        let d = new Date();
        d.setHours(d.getHours() - inLastHours);

        return earthquakeQb.andWhere("quake.time >= :inLastHours", {inLastHours: d});
    }

}