import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import {SchedulerResult} from "../results/SchedulerResult";
import {IEarthquakeApiService} from "../../emsc/abstractions/IEarthquakeApiService";
import {inject} from "inversify";
import TYPES from "../../../types";


export class EarthquakeApiScheduler extends AbstractScheduler {
    private _earthquakeApiService: IEarthquakeApiService;
    constructor(@inject(TYPES.IEarthquakeApiService) earthquakeApiService: IEarthquakeApiService) {
        super("",EarthquakeApiScheduler.constructor.name);
        this._earthquakeApiService = earthquakeApiService;
    }

    async executeScheduler(): Promise<SchedulerResult> {
        let result : SchedulerResult = new SchedulerResult();
        try {
            await this._earthquakeApiService.getEarthquakeInfoFeed();
            result.success = true;
            return result;
        } catch (e) {
            result.error = e as Error;
            return result;
        }
    }
}