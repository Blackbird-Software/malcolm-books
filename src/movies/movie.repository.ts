import {EntityRepository, Repository} from "typeorm";
import {ConflictException, Logger, NotFoundException} from "@nestjs/common";
import {Movie} from "./movie.entity";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {MovieInterface} from "./movie.interface";
import {UpdateMovieDto} from "./dto/update-movie.dto";
import {GenreInterface} from "../genres/genre.interface";
import {ActorInterface} from "../actors/actor.interface";
import {DirectorInterface} from "../directors/director.interface";

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
    private logger = new Logger('MovieRepository');

    async createMovie(dto: CreateMovieDto): Promise<MovieInterface> {
        const exists = await this.findOne(dto.title);

        if (exists) {
            throw new ConflictException('Movie with the same name already exists. ');
        }

        const movie = new Movie();
        movie.title = dto.title;
        movie.description = dto.description;
        movie.premiere = dto.premiere;
        await movie.save();

        return movie;
    }

    async updateMovie(id: string, dto: UpdateMovieDto): Promise<MovieInterface> {
        const movie = await this.findOne(id);
        movie.title = dto.title;
        movie.description = dto.description;
        movie.premiere = dto.premiere;
        await movie.save();

        return movie;
    }

    async changeGenres(id: string, genres: GenreInterface[]): Promise<MovieInterface> {
        const movie = await this.getMovie(id);
        movie.genres = genres;
        await movie.save();

        return movie;
    }

    async changeActors(id: string, actors: ActorInterface[]): Promise<MovieInterface> {
        const movie = await this.getMovie(id);
        movie.actors = actors;
        await movie.save();

        return movie;
    }

    async changeDirectors(id: string, directors: DirectorInterface[]): Promise<MovieInterface> {
        const movie = await this.getMovie(id);
        movie.directors = directors;
        await movie.save();

        return movie;
    }

    private async getMovie(id: string): Promise<Movie> {
        const movie = await this.findOne(id);

        if (!movie) {
            throw new NotFoundException('Movie does not exists. ');
        }

        return movie;
    }
}