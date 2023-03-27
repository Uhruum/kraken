import { DataSource } from "typeorm"
import {Earthquake} from "./src/domain/entities/Earthquake";
import {Location} from "./src/domain/entities/Location";
import {init1679934747224} from "./src/domain/migrations/1679934747224-init";

const myDataSource = new DataSource({
    type: "sqlite",
    database: "./kraken.sqlite3",
    synchronize: false,
    logging: false,
    entities: [Earthquake,Location],
    migrations: [init1679934747224]
});
export default myDataSource;