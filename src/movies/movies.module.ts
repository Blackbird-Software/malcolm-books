import {Module} from '@nestjs/common';
import {AuthModule} from '../auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MovieRepository} from "./movie.repository";
import {MoviesController} from "./movies.controller";
import {MoviesService} from "./movies.service";
import {GenresService} from "../genres/genres.service";
import {GenresModule} from "../genres/genres.module";
import {GenreRepository} from "../genres/genre.repository";
import {DirectorRepository} from "../directors/director.repository";
import {ActorRepository} from "../actors/actor.repository";
import {DirectorsService} from "../directors/directors.service";
import {ActorsService} from "../actors/actors.service";

// possibly get rid of some dependencies
@Module({
    imports: [
        TypeOrmModule.forFeature([MovieRepository]),
        TypeOrmModule.forFeature([GenreRepository]),
        TypeOrmModule.forFeature([DirectorRepository]),
        TypeOrmModule.forFeature([ActorRepository]),
        AuthModule,
        GenresModule,
        DirectorRepository,
        ActorRepository
    ],
    controllers: [MoviesController],
    providers: [MoviesService, GenresService, DirectorsService, ActorsService],
})
export class MoviesModule {
}