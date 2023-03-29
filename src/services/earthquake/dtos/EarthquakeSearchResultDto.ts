export class EarthquakeSearchResultDto {
    id: number
    title: string
    magnitude: number
    time : Date
    latitude: number
    longitude: number
    city?: string
    country?: string

    constructor(id: number, title: string, magnitude: number, time: Date, latitude: number, longitude: number, city: string, country: string) {
        this.id = id;
        this.title = title;
        this.magnitude = magnitude;
        this.time = time;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.country = country;
    }
}