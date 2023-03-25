import {IReverseGeocodingService} from "./services/reverseGeocoding/abstractions/IReverseGeocodingService";

let TYPES = {
  IEarthquakeApiService: Symbol("IEarthquakeApiService"),
  IReverseGeocodingService:Symbol("IReverseGeocodingService")
};

export default TYPES;