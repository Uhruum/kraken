import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Location} from "./Location";

@Entity()
export class Earthquake{

    @PrimaryColumn()
    id:number

    @Column()
    title: string

    @Column()
    time: Date

    @ManyToOne(() => Location, (location) => location.earthquakes)
    location: Location;
}