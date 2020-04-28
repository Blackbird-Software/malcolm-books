import {EntityRepository, Repository} from "typeorm";
import {ConflictException, Logger, NotFoundException} from "@nestjs/common";
import {Movie} from "./movie.entity";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {MovieInterface} from "./movie.interface";
import {UpdateMovieDto} from "./dto/update-movie.dto";

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
        // movie.genres = dto.genres;
        // movie.actors = dto.actors;
        // movie.directors = dto.directors;
        await movie.save();

        return movie;
    }

    async updateMovie(id: string, dto: UpdateMovieDto): Promise<MovieInterface> {
        const movie = await this.findOne(id);

        if (!movie) {
            throw new NotFoundException('Movie does not exists. ');
        }

        movie.title = dto.title;
        movie.description = dto.description;
        movie.premiere = dto.premiere;
        // movie.genres = dto.genres;
        // movie.actors = dto.actors;
        // movie.directors = dto.directors;
        await movie.save();

        return movie;
    }
}