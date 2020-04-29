import {EntityRepository, Repository} from 'typeorm';
import {ConflictException, UnauthorizedException} from '@nestjs/common';
import {User} from './user.entity';
import {plainToClass} from 'class-transformer';
import {RegisterUserDto} from './dto/register-user.dto';
import {LoginDto} from '../auth/dto/login.dto';
import {UserInterface} from './user.interface';
import {PasswordHasher} from './hashers/password-hasher';
import {PasswordHasherInterface} from './hashers/password-hasher.interface';
import {NullUser} from './null-user';

@EntityRepository(User)
export class UserRepository extends Repository<UserInterface> {

    constructor(
        private readonly passwordHasher: PasswordHasherInterface,
    ) {
        super();
        this.passwordHasher = new PasswordHasher();
    }

    async register(dto: RegisterUserDto): Promise<UserInterface> {
        const {email, password, firstName, lastName} = dto;
        const exists = await this.findOne({email});

        if (exists) {
            throw new ConflictException('User already exists. ');
        }

        const user = new User();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.salt = await this.passwordHasher.generateSalt();
        user.password = await this.passwordHasher.hashPassword(password, user.salt);

        const saved = await user.save();
        return plainToClass(User, saved); // because of: https://github.com/nestjs/nest/issues/2237
    }

    async validateUserPassword(dto: LoginDto): Promise<UserInterface> {
        const {email, password} = dto;
        const user = await this.findOne({email}) || new NullUser();

        if (await user.validatePassword(password)) {
            return user;
        }

        throw new UnauthorizedException('Invalid credentials');
    }
}
