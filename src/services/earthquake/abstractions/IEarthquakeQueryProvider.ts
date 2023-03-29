import {SelectQueryBuilder} from "typeorm";
import {Earthquake} from "../../../domain/entities/Earthquake";

/**
 * Provides pieces of query for filtering information about earthquakes
 */
export interface IEarthquakeQueryProvider {
    /**
     * Provides base {@link SelectQueryBuilder} of entity {@link Earthquake} with set up relation
     * and aliases.
     * @returns {@link Promise} of {@link SelectQueryBuilder} of entity {@link Earthquake}
     */
    provideEarthquakeQueryBuilder() : Promise<SelectQueryBuilder<Earthquake>>

    /**
     * Appends to a base query where clause if provided params are not undefined.
     * @param earthquakeQb {@link SelectQueryBuilder} of entity {@link Earthquake}
     * @param byLatitude
     * @param byLongitude
     * @returns {@link SelectQueryBuilder} of entity {@link Earthquake}
     */
    provideQueryFindAllEarthquakesByLatAndLong(earthquakeQb: SelectQueryBuilder<Earthquake>,
                                   byLatitude?: number, byLongitude?: number): SelectQueryBuilder<Earthquake>

    /**
     * Appends to a base query where clause if provided params are not undefined.
     * @param earthquakeQb {@link SelectQueryBuilder} of entity {@link Earthquake}
     * @param byCountry
     * @returns {@link SelectQueryBuilder} of entity {@link Earthquake}
     */
    provideQueryFindAllEarthquakesByCountry(earthquakeQb: SelectQueryBuilder<Earthquake>, byCountry?: string): SelectQueryBuilder<Earthquake>

    /**
     * Appends to a base query where clause if provided params are not undefined.
     * @param earthquakeQb {@link SelectQueryBuilder} of entity {@link Earthquake}
     * @param byYear
     * @returns {@link SelectQueryBuilder} of entity {@link Earthquake}
     */
    provideQueryFindAllEarthquakesByYear(earthquakeQb: SelectQueryBuilder<Earthquake>, byYear?: number): SelectQueryBuilder<Earthquake>

    /**
     * Appends to a base query where clause if provided params are not undefined.
     * @param earthquakeQb {@link SelectQueryBuilder} of entity {@link Earthquake}
     * @param inLastDays
     * @returns {@link SelectQueryBuilder} of entity {@link Earthquake}
     */
    provideQueryFindAllEarthquakesInLastDays(earthquakeQb: SelectQueryBuilder<Earthquake>, inLastDays?: number): SelectQueryBuilder<Earthquake>

    /**
     * Appends to a base query where clause if provided params are not undefined.
     * @param earthquakeQb {@link SelectQueryBuilder} of entity {@link Earthquake}
     * @param inLastHours
     * @returns {@link SelectQueryBuilder} of entity {@link Earthquake}
     */
    provideQueryFindAllEarthquakesInLastHours(earthquakeQb: SelectQueryBuilder<Earthquake>, inLastHours?: number): SelectQueryBuilder<Earthquake>

    /**
     * Appends to a base query where clause if provided params are not undefined.
     * @param earthquakeQb {@link SelectQueryBuilder} of entity {@link Earthquake}
     * @param byMagnitude
     * @returns {@link SelectQueryBuilder} of entity {@link Earthquake}
     */
    provideQueryFindAllEarthquakesByMagnitude(earthquakeQb: SelectQueryBuilder<Earthquake>, byMagnitude?: number): SelectQueryBuilder<Earthquake>

    /**
     * Appends to a base query where clause if provided params are not undefined.
     * @param earthquakeQb {@link SelectQueryBuilder} of entity {@link Earthquake}
     * @param id
     * @returns {@link SelectQueryBuilder} of entity {@link Earthquake}
     */
    provideQueryGetEarthquakesById(earthquakeQb: SelectQueryBuilder<Earthquake>, id: number): SelectQueryBuilder<Earthquake>

}