import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
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

    @CreateDateColumn()
    createdDate:Date

    @UpdateDateColumn()
    updatedDate:Date

    @OneToMany(() => Earthquake , (earthquake)=>  earthquake.location)
    @JoinColumn()
    earthquakes: Array<Earthquake>

}