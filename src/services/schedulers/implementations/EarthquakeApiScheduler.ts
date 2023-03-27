import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import {IEarthquakeApiService} from "../../emsc/abstractions/IEarthquakeApiService";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import Tag from "../../../tags";
import {IScheduler} from "../abstrations/IScheduler";

@injectable()
export class EarthquakeApiScheduler extends AbstractScheduler implements IScheduler{
    private _earthquakeApiService: IEarthquakeApiService;
    constructor(@inject(TYPES.IEarthquakeApiService) earthquakeApiService: IEarthquakeApiService) {
        super();
        this._earthquakeApiService = earthquakeApiService;
    }

    override async executeScheduler(): Promise<void> {
        try {
            const earthquakeInfoDtos = await this._earthquakeApiService.getEarthquakeInfoFeed();
            console.log(`EarthquakeApiScheduler result: ${earthquakeInfoDtos}`);
        } catch (e) {
            throw e as Error;
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