import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';
import {DirectorInterface} from './director.interface';

@Entity('directors')
export class Director extends BaseEntity implements DirectorInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}
