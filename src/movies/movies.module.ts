import {Module} from '@nestjs/common';
import {AuthModule} from '../auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MovieRepository} from './movie.repository';
import {MoviesController} from './movies.controller';
import {MoviesService} from './movies.service';
import {GenresService} from '../genres/genres.service';
import {GenresModule} from '../genres/genres.module';
import {GenreRepository} from '../genres/genre.repository';
import {DirectorRepository} from '../directors/director.repository';
import {ActorRepository} from '../actors/actor.repository';
import {DirectorsService} from '../directors/directors.service';
import {ActorsService} from '../actors/actors.service';
import CountriesList from '../common/countries-list';
import {FilesService} from '../files/files.service';
import {FileRepository} from '../files/file.repository';
import {LogsModule} from "../logs/logs.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([MovieRepository]),
        TypeOrmModule.forFeature([GenreRepository]),
        TypeOrmModule.forFeature([DirectorRepository]),
        TypeOrmModule.forFeature([ActorRepository]),
        TypeOrmModule.forFeature([FileRepository]),
        AuthModule,
        GenresModule,
        LogsModule,
        DirectorRepository,
        ActorRepository,
        FileRepository,
    ],
    controllers: [MoviesController],
    providers: [
        MoviesService,
        GenresService,
        DirectorsService,
        ActorsService,
        FilesService,
        CountriesList,
    ],
})
export class MoviesModule {
}
