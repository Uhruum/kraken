import {Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Earthquake} from "./Earthquake";

@Entity()
export class Location{

    @PrimaryGeneratedColumn("uuid")
    id:string
    @Column()
    latitude: number
    @Column()
    longitude: number
    @Column()
    city:string;
    @Column()
    country:string;
    @Column()
    countryCode:string;

    @OneToMany(() => Earthquake , (earthquake)=>  earthquake.location)
    @JoinColumn()
    earthquakes: Array<Earthquake>

}