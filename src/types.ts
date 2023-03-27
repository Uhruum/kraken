import {IReverseGeocodingService} from "./services/reverseGeocoding/abstractions/IReverseGeocodingService";
import {IScheduler} from "./services/schedulers/abstrations/IScheduler";

let TYPES = {
  ILogger:Symbol("ILogger"),
  IEarthquakeApiService: Symbol("IEarthquakeApiService"),
  IReverseGeocodingService:Symbol("IReverseGeocodingService"),
  IScheduler:Symbol("IScheduler"),
  ISchedulerService:Symbol("ISchedulerService"),
  IDatabaseService: Symbol("IDatabaseService")
};

export default TYPES;