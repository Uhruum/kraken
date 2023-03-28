import { DataSource } from "typeorm"
import {Earthquake} from "./src/domain/entities/Earthquake";
import {Location} from "./src/domain/entities/Location";
import {init1679934747224} from "./src/domain/migrations/1679934747224-init";
import {locationChanges1680016292008} from "./src/domain/migrations/1680016292008-locationChanges";

const myDataSource = new DataSource({
    type: "sqlite",
    database: "./kraken.sqlite3",
    synchronize: false,
    logging: false,
    entities: [Earthquake,Location],
    migrations: [init1679934747224,locationChanges1680016292008]
});
export default myDataSource;