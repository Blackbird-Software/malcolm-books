import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeorm.config';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from "./users/users.module";
import {GenresModule} from "./genres/genres.module";
import {DirectorsModule} from "./directors/directors.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule,
        UsersModule,
        GenresModule,
        DirectorsModule
    ],
})
export class AppModule {
}
