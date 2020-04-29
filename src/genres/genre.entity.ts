import {Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, ManyToMany, Index} from 'typeorm';
import {GenreInterface} from './genre.interface';
import {Movie} from '../movies/movie.entity';
import {MovieInterface} from '../movies/movie.interface';

@Entity('genres')
export class Genre extends BaseEntity implements GenreInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({unique: true})
    @Column()
    name: string;

    @Column({type: 'text', nullable: true})
    description?: string;

    @ManyToMany(type => Movie, movie => movie.genres, {
        cascade: true,
    })
    movies?: MovieInterface[];
}
