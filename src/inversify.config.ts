import TYPES from './types';
import Tag from "./tags";
import {Container} from 'inversify';
import { EarthquakeApiService } from './services/emsc/implementations/EarthquakeApiService';
import { IEarthquakeApiService } from './services/emsc/abstractions/IEarthquakeApiService';
import {IReverseGeocodingService} from "./services/reverseGeocoding/abstractions/IReverseGeocodingService";
import {ReverseGeocodingService} from "./services/reverseGeocoding/implementations/ReverseGeocodingService";
import {IScheduler} from "./services/schedulers/abstrations/IScheduler";
import {EarthquakeApiScheduler} from "./services/schedulers/implementations/EarthquakeApiScheduler";
import {TestScheduler} from "./services/schedulers/implementations/TestScheduler";
import {ISchedulerService} from "./services/schedulers/abstrations/ISchedulerService";
import {SchedulerService} from "./services/schedulers/implementations/SchedulerService";

let container = new Container();

container.bind<IEarthquakeApiService>(TYPES.IEarthquakeApiService ).to(EarthquakeApiService).inSingletonScope();
container.bind<IReverseGeocodingService>(TYPES.IReverseGeocodingService ).to(ReverseGeocodingService).inRequestScope();
container.bind<IScheduler>(TYPES.IScheduler).to(EarthquakeApiScheduler).inSingletonScope().whenTargetNamed(Tag.EARTH_QUAKE_SCHEDULER);
container.bind<IScheduler>(TYPES.IScheduler).to(TestScheduler).inSingletonScope().whenTargetNamed(Tag.TEST_SCHEDULER);
container.bind<ISchedulerService>(TYPES.ISchedulerService ).to(SchedulerService).inSingletonScope();
export default container;