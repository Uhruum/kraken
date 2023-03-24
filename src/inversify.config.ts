import TYPES from './types';
import {Container} from 'inversify';
import { EarthquakeApiService } from './emsc/implementations/EarthquakeApiService';
import { IEarthquakeApiService } from './emsc/abstractions/IEarthquakeApiService';

let container = new Container();

container.bind<IEarthquakeApiService>(TYPES.IEarthquakeApiService ).to(EarthquakeApiService).inSingletonScope();
export default container;