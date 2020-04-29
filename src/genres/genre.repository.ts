import {EntityRepository, Repository} from 'typeorm';
import {Genre} from './genre.entity';
import {ConflictException, Logger, NotFoundException} from '@nestjs/common';
import {CreateGenreDto} from './dto/create-genre.dto';
import {GenreInterface} from './genre.interface';
import {UpdateGenreDto} from './dto/update-genre.dto';

@EntityRepository(Genre)
export class GenreRepository extends Repository<Genre> {

    private readonly logger = new Logger('GenreRepository');

    async createGenre(dto: CreateGenreDto): Promise<GenreInterface> {
        const {name, description} = dto;
        const exists = await this.findOne({name});

        if (exists) {
            throw new ConflictException('Genre with the same name already exists. ');
        }

        const genre = new Genre();
        genre.name = name;
        genre.description = description;
        await genre.save();

        return genre;
    }

    async updateGenre(id: string, dto: UpdateGenreDto): Promise<GenreInterface> {
        const genre = await this.findOne(id);

        if (!genre) {
            throw new NotFoundException('Genre does not exists. ');
        }

        genre.description = dto.description;
        await genre.save();

        return genre;
    }
}
