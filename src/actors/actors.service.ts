import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateActorDto} from './dto/create-actor.dto';
import {ActorRepository} from './actor.repository';
import {ActorInterface} from './actor.interface';
import {UpdateActorDto} from './dto/update-actor.dto';
import {LogsService} from "../logs/logs.service";
import {ActionType} from "../logs/enum/action-types";

@Injectable()
export class ActorsService {

    private CLASSNAME = 'ACTOR';

    constructor(
        @InjectRepository(ActorRepository) private readonly directorRepository: ActorRepository,
        private logsService: LogsService
    ) {
        this.logsService.setClassName(this.CLASSNAME);
    }

    async create(dto: CreateActorDto): Promise<ActorInterface> {
        const actor = await this.directorRepository.createActor(dto);
        await this.logsService.sendMessage(actor, ActionType.CREATE);

        return actor;
    }

    async update(id: string, dto: UpdateActorDto): Promise<ActorInterface> {
        const actor = await this.directorRepository.updateActor(id, dto);
        await this.logsService.sendMessage(actor, ActionType.UPDATE);

        return actor;
    }

    async findAll(): Promise<ActorInterface[]> {
        return this.directorRepository.find();
    }

    async findById(id: string): Promise<ActorInterface> {
        const found = await this.directorRepository.findOne(id);

        if (!found) {
            throw new NotFoundException('Actor not found. ');
        }

        return found;
    }

    async delete(id: string): Promise<void> {
        const actor = await this.directorRepository.findOne(id);
        const result = await this.directorRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Actor with uuid "${id}" not found. `);
        }

        await this.logsService.sendMessage(actor, ActionType.DELETE);
    }
}
