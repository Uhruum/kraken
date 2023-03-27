import { DataSource} from "typeorm";
import myDataSource from "../../app-data-source";

class Database {
    public connection: DataSource;

    constructor() {
        this.connectToDB();
    }

    private connectToDB(): void {
        myDataSource.initialize()
            .then((_con) => {
                this.connection = _con;
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })
    }
}

export const db = new Database();