import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateDirectorDto} from './dto/create-director.dto';
import {DirectorRepository} from './director.repository';
import {DirectorInterface} from './director.interface';
import {UpdateDirectorDto} from './dto/update-director.dto';
import {LogsService} from "../logs/logs.service";
import {ActionType} from "../logs/enum/action-types";

@Injectable()
export class DirectorsService {

    private CLASSNAME = 'DIRECTOR';

    constructor(
        @InjectRepository(DirectorRepository) private readonly directorRepository: DirectorRepository,
        private readonly logsService: LogsService
    ) {
        this.logsService.setClassName(this.CLASSNAME);
    }

    async create(dto: CreateDirectorDto): Promise<DirectorInterface> {
        const director = await this.directorRepository.createDirector(dto);
        await this.logsService.sendMessage(director, ActionType.CREATE);

        return director;
    }

    async update(id: string, dto: UpdateDirectorDto): Promise<DirectorInterface> {
        const director = await this.directorRepository.updateDirector(id, dto);
        await this.logsService.sendMessage(director, ActionType.UPDATE);

        return director;
    }

    async findAll(): Promise<DirectorInterface[]> {
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
        const director = await this.directorRepository.findOne(id);
        const result = await this.directorRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Director with uuid "${id}" not found. `);
        }

        await this.logsService.sendMessage(director, ActionType.DELETE);
    }

}
