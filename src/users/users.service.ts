import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';

import {RegisterUserDto} from './dto/register-user.dto';
import {UserInterface} from './user.interface';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    async register(dto: RegisterUserDto): Promise<UserInterface> {
        return this.userRepository.register(dto);
    }
}
