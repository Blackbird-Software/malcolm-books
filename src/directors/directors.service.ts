import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateDirectorDto} from './dto/create-director.dto';
import {DirectorRepository} from './director.repository';
import {DirectorInterface} from './director.interface';
import {UpdateDirectorDto} from './dto/update-director.dto';

@Injectable()
export class DirectorsService {
    constructor(
        @InjectRepository(DirectorRepository)
        private directorRepository: DirectorRepository,
    ) {
    }

    async create(dto: CreateDirectorDto): Promise<DirectorInterface> {
        return this.directorRepository.createDirector(dto);
    }

    async update(id: string, dto: UpdateDirectorDto): Promise<DirectorInterface> {
        return this.directorRepository.updateDirector(id, dto);
    }

    findAll(): Promise<DirectorInterface[]> {
        return this.directorRepository.find();
    }

    async findById(id: string): Promise<DirectorInterface> {
        const found = await this.directorRepository.findOne(id);

        if (!found) {
            throw new NotFoundException('Director not found. ');
        }

        return found;
    }

    async delete(id: string): Promise<void> {
        const result = await this.directorRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Director with uuid "${id}" not found. `);
        }
    }

}
