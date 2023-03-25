import TYPES from './types';
import {Container} from 'inversify';
import { EarthquakeApiService } from './services/emsc/implementations/EarthquakeApiService';
import { IEarthquakeApiService } from './services/emsc/abstractions/IEarthquakeApiService';

let container = new Container();

container.bind<IEarthquakeApiService>(TYPES.IEarthquakeApiService ).to(EarthquakeApiService).inSingletonScope();
export default container;