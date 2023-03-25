import TYPES from './types';
import {Container} from 'inversify';
import { EarthquakeApiService } from './services/emsc/implementations/EarthquakeApiService';
import { IEarthquakeApiService } from './services/emsc/abstractions/IEarthquakeApiService';
import {IReverseGeocodingService} from "./services/reverseGeocoding/abstractions/IReverseGeocodingService";
import {ReverseGeocodingService} from "./services/reverseGeocoding/implementations/ReverseGeocodingService";
import {IScheduler} from "./services/schedulers/abstrations/IScheduler";
import {EarthquakeApiScheduler} from "./services/schedulers/implementations/EarthquakeApiScheduler";
import {TestScheduler} from "./services/schedulers/implementations/TestScheduler";

let container = new Container();

container.bind<IEarthquakeApiService>(TYPES.IEarthquakeApiService ).to(EarthquakeApiService).inRequestScope();
container.bind<IReverseGeocodingService>(TYPES.IReverseGeocodingService ).to(ReverseGeocodingService).inRequestScope();
container.bind<IScheduler>(TYPES.IScheduler).to(EarthquakeApiScheduler).inSingletonScope();
container.bind<IScheduler>(TYPES.IScheduler).to(TestScheduler).inSingletonScope();
export default container;