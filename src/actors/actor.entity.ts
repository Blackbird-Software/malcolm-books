import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, ManyToMany} from 'typeorm';
import {ActorInterface} from './actor.interface';
import {Gender} from '../common/gender.enum';
import {Movie} from "../movies/movie.entity";
import {MovieInterface} from "../movies/movie.interface";

@Entity('actors')
export class Actor extends BaseEntity implements ActorInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Index()
    @Column({
        type: "enum",
        enum: Gender,
    })
    gender: Gender;

    @ManyToMany(type => Movie, movie => movie.actors, {
        cascade: true
    })
    movies?: MovieInterface[];
}
