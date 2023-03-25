import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import {IEarthquakeApiService} from "../../emsc/abstractions/IEarthquakeApiService";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";

@injectable()
export class EarthquakeApiScheduler extends AbstractScheduler {
    private _earthquakeApiService: IEarthquakeApiService;
    constructor(@inject(TYPES.IEarthquakeApiService) earthquakeApiService: IEarthquakeApiService) {
        super();
        this._earthquakeApiService = earthquakeApiService;
    }

    override async executeScheduler(): Promise<void> {
        try {
            await this._earthquakeApiService.getEarthquakeInfoFeed();
        } catch (e) {
            throw e as Error;
        }
    }

    getCroneExpression(): string {
        return "* */5 * * * *";
    }

    getSchedulerName(): string {
        return EarthquakeApiScheduler.name;
    }
}