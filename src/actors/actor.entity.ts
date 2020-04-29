import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index} from 'typeorm';
import {ActorInterface} from './actor.interface';
import {Gender} from '../common/gender.enum';

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
}
