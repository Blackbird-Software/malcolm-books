import {Module} from '@nestjs/common';
import {GenresModule} from './genres/genres.module';
import {DirectorsModule} from './directors/directors.module';
import {ActorsModule} from './actors/actors.module';
import {MoviesModule} from './movies/movies.module';
import {EnumsModule} from './enum/enums.module';
import {FilesModule} from './files/files.module';
import {HealthModule} from './health/health.module';
import {DatabaseOrmModule} from "./database-orm.module";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        DatabaseOrmModule(),
        GenresModule,
        DirectorsModule,
        ActorsModule,
        MoviesModule,
        FilesModule,
        EnumsModule,
        HealthModule,
        AuthModule
    ],
})
export class AppModule {
}
