import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Index,
    CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import {FileInterface} from './file.interface';
import {Movie} from '../movies/movie.entity';
import {MovieInterface} from '../movies/movie.interface';

@Entity('files')
export class File extends BaseEntity implements FileInterface {

    public static DEFAULT_UPLOAD_PATH = './uploads';

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({unique: true})
    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    originalName: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(
        type => Movie,
        movie => movie.cover,
        {onDelete: 'SET NULL'},
    )
    movie: MovieInterface;
}
