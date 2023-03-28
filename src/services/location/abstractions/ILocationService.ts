import {Location} from "../../../domain/entities/Location";

export interface ILocationService {
    getLocation(latitude:number, longitude:number) : Promise<Location>
}