import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Location} from "./Location";

@Entity()
export class Earthquake{

    @PrimaryColumn()
    id:number

    @Column()
    title: string

    @Column()
    magnitude:number

    @Column()
    time: Date

    @CreateDateColumn()
    createdDate:Date

    @UpdateDateColumn()
    updatedDate:Date

    @ManyToOne(() => Location, (location) => location.earthquakes)
    location: Location;
}