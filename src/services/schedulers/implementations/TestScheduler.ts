import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import {injectable} from "inversify";
import * as os from "os";
import Tag from "../../../tags";
import {IScheduler} from "../abstrations/IScheduler";
import container from "../../../inversify.config";
import {ILogger} from "../../logger/abstractions/ILogger";
import TYPES from "../../../types";

@injectable()
export class TestScheduler extends AbstractScheduler implements IScheduler {

    constructor() {
        super();
    }

    override async executeScheduler(): Promise<void> {
        const logger = container.get<ILogger>(TYPES.ILogger);
        try {
            let heap = process.memoryUsage().heapUsed / 1024 / 1024;
            let date = new Date().toISOString();
            const freeMemory = Math.round((os.freemem() * 100) / os.totalmem()) + "%";
            logger.log("INFO", `TestScheduler report - date: ${date}, heap: ${heap}, freeMemory: ${freeMemory} `);
        } catch (e) {
            const error = e as Error;
            logger.log("ERROR", error.message);
        }
    }

    override getCroneExpression(): string {
        return `${process.env.TestSchedulerCronExpression}`;
    }

    override getSchedulerName(): string {
        return TestScheduler.name;
    }

    override getSchedulerTag(): Tag {
        return Tag.TEST_SCHEDULER;
    }
}