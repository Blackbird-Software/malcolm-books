import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {MovieRepository} from './movie.repository';
import {UpdateMovieDto} from './dto/update-movie.dto';
import {MovieInterface} from './movie.interface';
import {CreateMovieDto} from './dto/create-movie.dto';
import {GenreInterface} from '../genres/genre.interface';
import {DirectorInterface} from '../directors/director.interface';
import {ActorInterface} from '../actors/actor.interface';
import {GetMoviesFilterDto} from './dto/get-movies-filter.dto';
import {PaginationParamsDto} from '../common/pagination/dto/pagination-params.dto';
import PaginatedResponseInterface from '../common/pagination/paginated-response.interface';
import PaginationFactory from '../common/pagination/pagination.factory';
import {FilesService} from '../files/files.service';
import {FileInterface} from '../files/file.interface';

@Injectable()
export class MoviesService {

    constructor(
        @InjectRepository(MovieRepository)
        private readonly movieRepository: MovieRepository,
        private readonly filesService: FilesService,
    ) {}

    async create(dto: CreateMovieDto): Promise<MovieInterface> {
        const cover = await this.filesService.findById(dto.cover);
        return this.movieRepository.createMovie(dto, cover);
    }

    async update(id: string, dto: UpdateMovieDto): Promise<MovieInterface> {
        const cover = await this.filesService.findById(dto.cover);
        return this.movieRepository.updateMovie(id, dto, cover);
    }

    async changeGenres(id: string, genres: GenreInterface[]): Promise<MovieInterface> {
        return this.movieRepository.changeGenres(id, genres);
    }

    async changeActors(id: string, actors: ActorInterface[]): Promise<MovieInterface> {
        return this.movieRepository.changeActors(id, actors);
    }

    async changeDirectors(id: string, directors: DirectorInterface[]): Promise<MovieInterface> {
        return this.movieRepository.changeDirectors(id, directors);
    }

    async updateCover(id: string, cover: FileInterface): Promise<MovieInterface> {
        return this.movieRepository.updateCover(id, cover);
    }

    async findAll(): Promise<MovieInterface[]> {
        return this.movieRepository.find();
    }

    async findBy(
        filter: GetMoviesFilterDto,
        paginationParams: PaginationParamsDto,
        routeParams: { path: string, params?: any[] },
    ): Promise<PaginatedResponseInterface> {
        const qb = await this.movieRepository.getQb(filter);
        const paginationFactory = new PaginationFactory(qb, paginationParams, routeParams);
        return paginationFactory.createPaginatedResponse();
    }

    async findById(id: string): Promise<MovieInterface> {
        const found = await this.movieRepository.findOne(id);

        if (!found) {
            throw new NotFoundException('Movie not found. ');
        }

        return found;
    }

    async delete(id: string): Promise<void> {
        const result = await this.movieRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Movie with uuid "${id}" not found. `);
        }
    }

}
