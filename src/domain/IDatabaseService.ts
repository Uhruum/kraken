import {DataSource} from "typeorm";

/**
 * Manages connection to the database!
 */
export interface IDatabaseService {
    /**
     * This method returns instance of {@link DataSource} as a {@link Promise}
     */
    getDataSource(): Promise<DataSource>;
}