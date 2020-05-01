import {EntityRepository, QueryBuilder, Repository, SelectQueryBuilder} from 'typeorm';
import {ConflictException, Logger, NotFoundException} from '@nestjs/common';
import {Movie} from './movie.entity';
import {CreateMovieDto} from './dto/create-movie.dto';
import {MovieInterface} from './movie.interface';
import {UpdateMovieDto} from './dto/update-movie.dto';
import {GenreInterface} from '../genres/genre.interface';
import {ActorInterface} from '../actors/actor.interface';
import {DirectorInterface} from '../directors/director.interface';
import {GetMoviesFilterDto} from './dto/get-movies-filter.dto';
import {PaginationParamsDto} from '../common/pagination/dto/pagination-params.dto';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
    private readonly logger = new Logger('MovieRepository');

    async createMovie(dto: CreateMovieDto): Promise<MovieInterface> {
        const exists = await this.findOne(dto.title);

        if (exists) {
            throw new ConflictException('Movie with the same name already exists. ');
        }

        const movie = new Movie();
        movie.title = dto.title;
        movie.description = dto.description;
        movie.premiere = dto.premiere;
        movie.country = dto.country;
        await movie.save();

        return movie;
    }

    async updateMovie(id: string, dto: UpdateMovieDto): Promise<MovieInterface> {
        const movie = await this.findOne(id);
        movie.title = dto.title;
        movie.description = dto.description;
        movie.premiere = dto.premiere;
        movie.country = dto.country;
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

    async getQb(filter: GetMoviesFilterDto): Promise<SelectQueryBuilder<any>> {
        const search = filter.search;
        const qb = this.createQueryBuilder('mv');

        if (search) {
            qb.andWhere('(mv.title LIKE :search OR mv.description LIKE :search)', {search: `%${search}%`});
        }

        return qb;
    }

    private async getMovie(id: string): Promise<Movie> {
        const movie = await this.findOne(id);

        if (!movie) {
            throw new NotFoundException('Movie does not exists. ');
        }

        return movie;
    }
}
