import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import { injectable} from "inversify";
import TYPES from "../../../types";
import Tag from "../../../tags";
import {IScheduler} from "../abstrations/IScheduler";
import {ILogger} from "../../logger/abstractions/ILogger";
import {IEarthquakeService} from "../../earthquake/abstractions/IEarthquakeService";
import container from "../../../inversify.config";

@injectable()
export class EarthquakeScheduler extends AbstractScheduler implements IScheduler {
    constructor() {
        super();
    }

    override async executeScheduler(): Promise<void> {
        const logger = container.get<ILogger>(TYPES.ILogger);
        const earthquakeService = container.get<IEarthquakeService>(TYPES.IEarthquakeService);
        try {
            await earthquakeService.saveEarthquakeFeed();
        } catch (e) {
            const error = e as Error;
            logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
        }
    }

    override getCroneExpression(): string {
        return `${process.env.EarthquakeApiSchedulerCronExpression}`;
    }

    override getSchedulerName(): string {
        return EarthquakeScheduler.name;
    }

    override getSchedulerTag(): Tag {
        return Tag.EARTH_QUAKE_SCHEDULER;
    }
}