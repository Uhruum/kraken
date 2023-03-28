import {IReverseGeocodingService} from "./services/reverseGeocoding/abstractions/IReverseGeocodingService";
import {IScheduler} from "./services/schedulers/abstrations/IScheduler";
import {IEarthquakeService} from "./services/earthquake/abstractions/IEarthquakeService";

let TYPES = {
  ILogger:Symbol("ILogger"),
  IEarthquakeApiService: Symbol("IEarthquakeApiService"),
  IReverseGeocodingService:Symbol("IReverseGeocodingService"),
  IScheduler:Symbol("IScheduler"),
  ISchedulerService:Symbol("ISchedulerService"),
  IDatabaseService: Symbol("IDatabaseService"),
  ILocationService: Symbol("ILocationService"),
  IEarthquakeService: Symbol("IEarthquakeService")
};

export default TYPES;