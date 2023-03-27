import {IReverseGeocodingService} from "./services/reverseGeocoding/abstractions/IReverseGeocodingService";
import {IScheduler} from "./services/schedulers/abstrations/IScheduler";

let TYPES = {
  IEarthquakeApiService: Symbol("IEarthquakeApiService"),
  IReverseGeocodingService:Symbol("IReverseGeocodingService"),
  IScheduler:Symbol("IScheduler"),
  ISchedulerService:Symbol("ISchedulerService")
};

export default TYPES;