import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateGenreDto} from './dto/create-genre.dto';
import {GenreInterface} from './genre.interface';
import {GenreRepository} from './genre.repository';
import {UpdateGenreDto} from './dto/update-genre.dto';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(GenreRepository)
        private genreRepository: GenreRepository,
    ) {
    }

    async create(dto: CreateGenreDto): Promise<GenreInterface> {
        return this.genreRepository.createGenre(dto);
    }

    async update(id: string, dto: UpdateGenreDto): Promise<GenreInterface> {
       return this.genreRepository.updateGenre(id, dto);
    }

    findAll(): Promise<GenreInterface[]> {
        return this.genreRepository.find();
    }

    async findById(id: string): Promise<GenreInterface> {
        const found = await this.genreRepository.findOne(id);

        if (!found) {
            throw new NotFoundException('Genre not found. ');
        }

        return found;
    }

    async delete(id: string): Promise<void> {
        const result = await this.genreRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Genre with uuid "${id}" not found. `);
        }
    }

}
