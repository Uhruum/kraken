import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany, PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Earthquake} from "./Earthquake";

/**
 * Represents basic information about
 * physical address/location previously
 * devastated by earthquake.
 */
@Entity()
export class Location{

    @PrimaryColumn()
    latitude: number

    @PrimaryColumn()
    longitude: number

    @Column({ nullable: true })
    city:string;

    @Column({ nullable: true })
    country:string;

    @Column({ nullable: true })
    countryCode:string;

    @CreateDateColumn()
    createdDate:Date

    @UpdateDateColumn()
    updatedDate:Date

    @OneToMany(() => Earthquake , (earthquake)=>  earthquake.location)
    @JoinColumn()
    earthquakes: Array<Earthquake>

}