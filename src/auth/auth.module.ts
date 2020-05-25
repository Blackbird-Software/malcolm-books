import {Global, Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import config from 'config';
import {UsersService} from "./users.service";

const jwtConfig = config.jwt;

@Global()
@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwtConfig.secret,
            signOptions: {
                expiresIn: jwtConfig.expiresIn,
            },
        }),
    ],
    providers: [
        UsersService,
    ],
    exports: [
        PassportModule,
        UsersService
    ],
})

export class AuthModule {
}
