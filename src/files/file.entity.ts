import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Index,
    CreateDateColumn} from 'typeorm';
import {FileInterface} from "./file.interface";

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
}
