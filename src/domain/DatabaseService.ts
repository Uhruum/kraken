import {DataSource} from "typeorm";
import myDataSource from "../../app-data-source";
import {inject, injectable} from "inversify";
import TYPES from "../compositionRoot/types";
import {ILogger} from "../services/logger/abstractions/ILogger";
import {IDatabaseService} from "./IDatabaseService";

@injectable()
export class DatabaseService implements IDatabaseService {
    private static _dataSource: DataSource;

    public constructor(@inject(TYPES.ILogger) private readonly _logger: ILogger) {}

    async getDataSource(): Promise<DataSource> {
        if (DatabaseService._dataSource !== undefined) {
            return DatabaseService._dataSource;
        }

        try {
            DatabaseService._dataSource = await myDataSource.initialize();
            this._logger.log("INFO", `Connection established`);
            return DatabaseService._dataSource;
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
        }

        return DatabaseService._dataSource;
    }
}