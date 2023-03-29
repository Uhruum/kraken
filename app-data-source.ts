import { DataSource } from "typeorm"
import {Earthquake} from "./src/domain/entities/Earthquake";
import {Location} from "./src/domain/entities/Location";
import {init1680120702915} from "./src/domain/migrations/1680120702915-init";

const myDataSource = new DataSource({
    type: "sqlite",
    database: "./krakenDb.sqlite3",
    synchronize: false,
    logging: false,
    entities: [Earthquake,Location],
    migrations: [init1680120702915]
});
export default myDataSource;