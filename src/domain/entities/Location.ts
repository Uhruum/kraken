import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Earthquake} from "./Earthquake";

@Entity()
export class Location{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column({ nullable: true })
    city:string;

    @Column({ nullable: true })
    country:string;

    @Column({ nullable: true })
    countryCode:string;

    @OneToMany(() => Earthquake , (earthquake)=>  earthquake.location)
    @JoinColumn()
    earthquakes: Array<Earthquake>

}