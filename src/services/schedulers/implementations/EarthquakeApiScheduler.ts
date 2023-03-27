import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import {IEarthquakeApiService} from "../../emsc/abstractions/IEarthquakeApiService";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import Tag from "../../../tags";
import {IScheduler} from "../abstrations/IScheduler";
import {ILogger} from "../../logger/abstractions/ILogger";

@injectable()
export class EarthquakeApiScheduler extends AbstractScheduler implements IScheduler {
    constructor(@inject(TYPES.IEarthquakeApiService) private readonly earthquakeApiService: IEarthquakeApiService, @inject(TYPES.ILogger) private readonly logger: ILogger) {
        super();
    }

    override async executeScheduler(): Promise<void> {
        try {
            const earthquakeInfoDtos = await this.earthquakeApiService.getEarthquakeInfoFeed();
            this.logger.log("INFO",`EarthquakeApiScheduler result: ${earthquakeInfoDtos}`);
        } catch (e) {
            const error = e as Error;
            this.logger.log("ERROR",error.message);
            throw error;
        }
    }

    override getCroneExpression(): string {
        return `${process.env.EarthquakeApiSchedulerCronExpression}`;
    }

    override getSchedulerName(): string {
        return EarthquakeApiScheduler.name;
    }

    override getSchedulerTag(): Tag {
        return Tag.EARTH_QUAKE_SCHEDULER;
    }
}