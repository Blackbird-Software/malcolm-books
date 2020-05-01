import {DynamicModule, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {GenresModule} from './genres/genres.module';
import {DirectorsModule} from './directors/directors.module';
import {ActorsModule} from './actors/actors.module';
import {MoviesModule} from './movies/movies.module';
import * as config from './config/typeorm.config';
import {EnumsModule} from './enums/enums.module';

export function DatabaseOrmModule(): DynamicModule {
    return TypeOrmModule.forRoot(config);
}

@Module({
    imports: [
        DatabaseOrmModule(),
        AuthModule,
        UsersModule,
        GenresModule,
        DirectorsModule,
        ActorsModule,
        MoviesModule,
        EnumsModule,
    ],
})
export class AppModule {
}
