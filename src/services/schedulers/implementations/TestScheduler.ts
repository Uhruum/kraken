import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import {inject, injectable} from "inversify";
import * as os from "os";
import Tag from "../../../tags";
import {IScheduler} from "../abstrations/IScheduler";
import TYPES from "../../../types";
import {ILogger} from "../../logger/abstractions/ILogger";
@injectable()
export class TestScheduler extends AbstractScheduler implements IScheduler{
    constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {
        super();
    }
    override async executeScheduler(): Promise<void> {
        try {
            let heap = process.memoryUsage().heapUsed / 1024 / 1024;
            let date = new Date().toISOString();
            const freeMemory = Math.round((os.freemem() * 100) / os.totalmem()) + "%";
            this.logger.log("INFO",`TestScheduler report - date: ${date}, heap: ${heap}, freeMemory: ${freeMemory} `);
        } catch (e) {
            const error = e as Error;
            this.logger.log("ERROR",error.message);
            throw error;
        }
    }

    override getCroneExpression(): string {
        return  `${process.env.TestSchedulerCronExpression}`;
    }

    override getSchedulerName(): string {
        return TestScheduler.name;
    }

    override getSchedulerTag(): Tag {
        return Tag.TEST_SCHEDULER;
    }
}