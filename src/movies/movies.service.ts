import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MovieRepository} from "./movie.repository";
import {UpdateMovieDto} from "./dto/update-movie.dto";
import {MovieInterface} from "./movie.interface";
import {CreateMovieDto} from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(MovieRepository)
        private movieRepository: MovieRepository,
    ) {
    }

    async create(dto: CreateMovieDto): Promise<MovieInterface> {
        return this.movieRepository.createMovie(dto);
    }

    async update(id: string, dto: UpdateMovieDto): Promise<MovieInterface> {
       return this.movieRepository.updateMovie(id, dto);
    }

    findAll(): Promise<MovieInterface[]> {
        return this.movieRepository.find();
    }

    async findById(id: string): Promise<MovieInterface> {
        const found = await this.movieRepository.findOne(id);

        if(!found) {
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