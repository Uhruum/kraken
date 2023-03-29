/**
 * Represents result of parsed row from esmc rss feed
 */
export class EarthquakeInfoDto{
  title: string
  lat: number
  long: number
  time: Date
  link: string
  magnitude:string

  constructor(title:string, lat: number, long: number, time: Date, link: string, magnitude:string) {
    this.title = title;
    this.lat = lat;
    this.long = long;
    this.time = time;
    this.link = link;
    this.magnitude= magnitude;
  }
}