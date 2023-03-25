import TYPES from './types';
import {Container} from 'inversify';
import { EarthquakeApiService } from './services/emsc/implementations/EarthquakeApiService';
import { IEarthquakeApiService } from './services/emsc/abstractions/IEarthquakeApiService';
import {IReverseGeocodingService} from "./services/reverseGeocoding/abstractions/IReverseGeocodingService";
import {ReverseGeocodingService} from "./services/reverseGeocoding/implementations/ReverseGeocodingService";

let container = new Container();

container.bind<IEarthquakeApiService>(TYPES.IEarthquakeApiService ).to(EarthquakeApiService).inRequestScope();
container.bind<IReverseGeocodingService>(TYPES.IReverseGeocodingService ).to(ReverseGeocodingService).inRequestScope();
export default container;