import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateGenreDto} from './dto/create-genre.dto';
import {GenreInterface} from './genre.interface';
import {GenreRepository} from './genre.repository';
import {UpdateGenreDto} from './dto/update-genre.dto';
import {LogsService} from "../logs/logs.service";
import {ActionType} from "../logs/enum/action-types";

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(GenreRepository) private genreRepository: GenreRepository,
        private readonly logsService: LogsService
    ) {
    }

    async create(dto: CreateGenreDto): Promise<GenreInterface> {
        const genre = await this.genreRepository.createGenre(dto);
        await this.logsService.sendMessage(genre, ActionType.CREATE);

        return genre;
    }

    async update(id: string, dto: UpdateGenreDto): Promise<GenreInterface> {
        const genre = await this.genreRepository.updateGenre(id, dto);
        await this.logsService.sendMessage(genre, ActionType.UPDATE);

        return genre;
    }

    async findAll(): Promise<GenreInterface[]> {
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
        const genre = await this.genreRepository.findOne(id);
        const result = await this.genreRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Genre with uuid "${id}" not found. `);
        }

        await this.logsService.sendMessage(genre, ActionType.DELETE);
    }

}
