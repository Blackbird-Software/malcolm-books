import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany} from 'typeorm';
import {DirectorInterface} from './director.interface';
import {Movie} from '../movies/movie.entity';
import {MovieInterface} from '../movies/movie.interface';

@Entity('directors')
export class Director extends BaseEntity implements DirectorInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToMany(type => Movie, movie => movie.directors, {
        cascade: true,
    })
    movies?: MovieInterface[];
}
