import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn, Index,
} from 'typeorm';
import {Director} from '../directors/director.entity';
import {Actor} from '../actors/actor.entity';
import {MovieInterface} from './movie.interface';
import {Genre} from '../genres/genre.entity';
import {GenreInterface} from '../genres/genre.interface';
import {DirectorInterface} from '../directors/director.interface';
import {ActorInterface} from '../actors/actor.interface';

@Entity('movies')
export class Movie extends BaseEntity implements MovieInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column()
    title: string;

    @Column({nullable: true})
    description?: string;

    @Index()
    @Column()
    premiere: string;

    @ManyToMany(type => Genre, {eager: true})
    @JoinTable({name: 'movie_has_genres'})
    genres?: GenreInterface[];

    @ManyToMany(type => Director, {eager: true})
    @JoinTable({name: 'movie_has_directors'})
    directors?: DirectorInterface[];

    @ManyToMany(type => Actor, {eager: true})
    @JoinTable({name: 'movie_has_actors'})
    actors?: ActorInterface[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
