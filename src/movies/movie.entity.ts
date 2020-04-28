import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn
} from 'typeorm';
import {Director} from "../directors/director.entity";
import {Actor} from "../actors/actor.entity";
import {MovieInterface} from "./movie.interface";
import {Genre} from "../genres/genre.entity";

@Entity('movies')
export class Movie extends BaseEntity implements MovieInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({nullable: true})
    description?: string;

    @Column()
    premiere: string;

    // @ManyToMany(type => Genre)
    // @JoinTable()
    // genres?: Genre[];
    //
    // @ManyToMany(type => Director)
    // @JoinTable()
    // directors?: Director[];
    //
    // @ManyToMany(type => Actor)
    // @JoinTable()
    // actors?: Actor[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
