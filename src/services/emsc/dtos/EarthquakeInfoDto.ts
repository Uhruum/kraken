export class EarthquakeInfoDto{
  title: string
  lat: number
  long: number
  time: Date
  link: string

  constructor(title:string, lat: number, long: number, time: Date, link: string) {
    this.title = title;
    this.lat = lat;
    this.long = long;
    this.time = time;
    this.link = link;
  }
}