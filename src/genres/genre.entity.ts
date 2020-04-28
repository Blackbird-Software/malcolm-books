import {Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity} from 'typeorm';
import {GenreInterface} from "./genre.interface";

@Entity('genres')
@Unique(['name'])
export class Genre extends BaseEntity implements GenreInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({nullable: true})
    description?: string;
}
