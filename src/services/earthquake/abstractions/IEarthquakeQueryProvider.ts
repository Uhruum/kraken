import {SelectQueryBuilder} from "typeorm";
import {Earthquake} from "../../../domain/entities/Earthquake";

export interface IEarthquakeQueryProvider {

    provideEarthquakeQueryBuilder() : Promise<SelectQueryBuilder<Earthquake>>
    provideQueryFindAllEarthquakesByLatAndLong(earthquakeQb: SelectQueryBuilder<Earthquake>,
                                   byLatitude?: number, byLongitude?: number): SelectQueryBuilder<Earthquake>
    provideQueryFindAllEarthquakesByCountry(earthquakeQb: SelectQueryBuilder<Earthquake>, byCountry?: string): SelectQueryBuilder<Earthquake>
    provideQueryFindAllEarthquakesByYear(earthquakeQb: SelectQueryBuilder<Earthquake>, byYear?: number): SelectQueryBuilder<Earthquake>
    provideQueryFindAllEarthquakesInLastDays(earthquakeQb: SelectQueryBuilder<Earthquake>, inLastDays?: number): SelectQueryBuilder<Earthquake>
    provideQueryFindAllEarthquakesInLastHours(earthquakeQb: SelectQueryBuilder<Earthquake>, inLastHours?: number): SelectQueryBuilder<Earthquake>
    provideQueryFindAllEarthquakesByMagnitude(earthquakeQb: SelectQueryBuilder<Earthquake>, byMagnitude?: number): SelectQueryBuilder<Earthquake>
    provideQueryGetEarthquakesById(earthquakeQb: SelectQueryBuilder<Earthquake>, id: number): SelectQueryBuilder<Earthquake>

}