import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn, Index,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {Exclude} from 'class-transformer';
import {UserInterface} from './user.interface';

@Entity('users')
export class User extends BaseEntity implements UserInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({unique: true})
    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @Column()
    salt: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Exclude()
    fullName = () => `${this.firstName} ${this.lastName}`

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
