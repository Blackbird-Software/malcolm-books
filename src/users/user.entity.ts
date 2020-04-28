import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {Exclude} from "class-transformer";
import {UserInterface} from "./user.interface";

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity implements UserInterface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Exclude()
  fullName = () => `${this.firstName} ${this.lastName}`;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
