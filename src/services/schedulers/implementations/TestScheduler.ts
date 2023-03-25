import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import {injectable} from "inversify";
import * as os from "os";
@injectable()
export class TestScheduler extends AbstractScheduler{
    constructor() {
        super();
    }
    override async executeScheduler(): Promise<void> {
        try {
            let heap = process.memoryUsage().heapUsed / 1024 / 1024;
            let date = new Date().toISOString();
            const freeMemory = Math.round((os.freemem() * 100) / os.totalmem()) + "%";
            console.log(`TestScheduler report - date: ${date}, heap: ${heap}, freeMemory: ${freeMemory} `);
        } catch (e) {
            throw e as Error;
        }
    }

    override getCroneExpression(): string {
        return  `${process.env.TestSchedulerCronExpression}`;
    }

    override getSchedulerName(): string {
        return TestScheduler.name;
    }
}