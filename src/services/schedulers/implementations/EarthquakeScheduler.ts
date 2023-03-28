import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import {IEarthquakeApiService} from "../../emsc/abstractions/IEarthquakeApiService";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import Tag from "../../../tags";
import {IScheduler} from "../abstrations/IScheduler";
import {ILogger} from "../../logger/abstractions/ILogger";
import {IEarthquakeService} from "../../earthquake/abstractions/IEarthquakeService";

@injectable()
export class EarthquakeScheduler extends AbstractScheduler implements IScheduler {
    constructor(@inject(TYPES.IEarthquakeService) private readonly _earthquakeService: IEarthquakeService,
                @inject(TYPES.ILogger) private readonly _logger: ILogger) {
        super();
    }

    override async executeScheduler(): Promise<void> {
        try {
            await this._earthquakeService.saveEarthquakeFeed();
        } catch (e) {
            const error = e as Error;
            this._logger.log("ERROR", `msg: ${error.message} \nstackTrace: ${error.stack}`);
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