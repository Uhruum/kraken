import {Location} from "../../../domain/entities/Location";

/**
 * Manages location data
 */
export interface ILocationService {
    /**
     * Provides {@link Location} from database or {@link IReverseGeocodingService}
     * @param latitude
     * @param longitude
     * @returns {@link Promise} of {@link Location}
     * @throws {@link Error}
     */
    getLocation(latitude: number, longitude: number): Promise<Location>
}