import {EntityRepository, Repository} from 'typeorm';
import {Logger, NotFoundException} from '@nestjs/common';
import {CreateDirectorDto} from './dto/create-director.dto';
import {Director} from './director.entity';
import {DirectorInterface} from './director.interface';
import {UpdateDirectorDto} from './dto/update-director.dto';

@EntityRepository(Director)
export class DirectorRepository extends Repository<Director> {

    private readonly logger = new Logger('DirectorRepository');

    async createDirector(dto: CreateDirectorDto): Promise<DirectorInterface> {
        const {firstName, lastName} = dto;
        const director = new Director();
        director.firstName = firstName;
        director.lastName = lastName;
        await director.save();

        return director;
    }

    async updateDirector(id: string, dto: UpdateDirectorDto): Promise<DirectorInterface> {
        const director = await this.findOne(id);

        if (!director) {
            throw new NotFoundException('Director does not exists. ');
        }

        director.firstName = dto.firstName;
        director.lastName = dto.lastName;
        await director.save();

        return director;
    }
}
