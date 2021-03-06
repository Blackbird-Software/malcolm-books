import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn, Index, ManyToOne, OneToOne, JoinColumn,
} from 'typeorm';
import {Director} from '../directors/director.entity';
import {Actor} from '../actors/actor.entity';
import {MovieInterface} from './movie.interface';
import {Genre} from '../genres/genre.entity';
import {GenreInterface} from '../genres/genre.interface';
import {DirectorInterface} from '../directors/director.interface';
import {ActorInterface} from '../actors/actor.interface';
import {FileInterface} from '../files/file.interface';
import {File} from '../files/file.entity';

@Entity('movies')
export class Movie extends BaseEntity implements MovieInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column()
    title: string;

    @Column({type: 'text', nullable: true})
    description?: string;

    @Index()
    @Column()
    premiere: string;

    @ManyToMany(type => Genre, genre => genre.movies, {eager: true})
    @JoinTable({name: 'movie_has_genres'})
    genres?: GenreInterface[];

    @ManyToMany(type => Director, director => director.movies, {eager: true})
    @JoinTable({name: 'movie_has_directors'})
    directors?: DirectorInterface[];

    @ManyToMany(type => Actor, actor => actor.movies, {eager: true})
    @JoinTable({name: 'movie_has_actors'})
    actors?: ActorInterface[];

    @OneToOne(
        type => File,
        file => file.movie,
        {cascade: true, onDelete: 'SET NULL', eager: true},
    )
    @JoinColumn()
    cover: FileInterface;

    @Index()
    @Column()
    country: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
