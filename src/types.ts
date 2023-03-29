import {IReverseGeocodingService} from "./services/reverseGeocoding/abstractions/IReverseGeocodingService";
import {IScheduler} from "./services/schedulers/abstrations/IScheduler";
import {IEarthquakeService} from "./services/earthquake/abstractions/IEarthquakeService";
import {IEarthquakeQueryProvider} from "./services/earthquake/abstractions/IEarthquakeQueryProvider";
import {IEarthquakeMapper} from "./services/earthquake/abstractions/IEarthquakeMapper";

let TYPES = {
  ILogger:Symbol("ILogger"),
  IEarthquakeApiService: Symbol("IEarthquakeApiService"),
  IReverseGeocodingService:Symbol("IReverseGeocodingService"),
  IScheduler:Symbol("IScheduler"),
  ISchedulerService:Symbol("ISchedulerService"),
  IDatabaseService: Symbol("IDatabaseService"),
  ILocationService: Symbol("ILocationService"),
  IEarthquakeService: Symbol("IEarthquakeService"),
  IEarthquakeQueryProvider: Symbol("IEarthquakeQueryProvider"),
  IEarthquakeMapper: Symbol("IEarthquakeMapper")
};

export default TYPES;