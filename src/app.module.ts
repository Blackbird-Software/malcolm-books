import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {GenresModule} from './genres/genres.module';
import {DirectorsModule} from './directors/directors.module';
import {ActorsModule} from './actors/actors.module';
import {MoviesModule} from './movies/movies.module';
import {EnumsModule} from './enums/enums.module';
import {FilesModule} from './files/files.module';
import {HealthModule} from './health/health.module';
import {DatabaseOrmModule} from "./database-orm.module";

@Module({
    imports: [
        DatabaseOrmModule(),
        AuthModule,
        UsersModule,
        GenresModule,
        DirectorsModule,
        ActorsModule,
        MoviesModule,
        FilesModule,
        EnumsModule,
        HealthModule,
    ],
})
export class AppModule {
}
