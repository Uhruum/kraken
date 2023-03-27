import {DataSource} from "typeorm";

export interface IDatabaseService {
    getDataSource(): Promise<DataSource>;
}