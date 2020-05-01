import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { LoginDto } from './dto/login.dto';
import { JwtPayloadInterface } from './jwt/jwt-payload.interface';
import {JwtResponse} from './jwt/jwt-response';
import {JwtResponseInterface} from './jwt/jwt-response.interface';
import config from 'config';

const jwtConfig = config.jwt;

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<JwtResponseInterface> {
    const user = await this.userRepository.validateUserPassword(dto);
    const expiresIn = jwtConfig.expiresIn;

    const { email, id } = user;
    const payload: JwtPayloadInterface = { email, id };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return new JwtResponse(accessToken, expiresIn);
  }
}
