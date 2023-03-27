import {DataSource} from "typeorm";
import myDataSource from "../../app-data-source";
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {ILogger} from "../services/logger/abstractions/ILogger";
import {IDatabaseService} from "./IDatabaseService";

@injectable()
export class DatabaseService implements IDatabaseService {
    private static _dataSource: DataSource;

    public constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {}

    async getDataSource(): Promise<DataSource> {
        if (DatabaseService._dataSource !== undefined) {
            return DatabaseService._dataSource;
        }

        try {
            DatabaseService._dataSource = await myDataSource.initialize();
            this.logger.log("INFO", `Connection established`);
            return DatabaseService._dataSource;
        } catch (e) {
            this.logger.log("ERROR", "Cannot establish database connection");
        }

        return DatabaseService._dataSource;
    }
}