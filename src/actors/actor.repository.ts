import {EntityRepository, Repository} from 'typeorm';
import {Logger, NotFoundException} from '@nestjs/common';
import {CreateActorDto} from './dto/create-actor.dto';
import {ActorInterface} from './actor.interface';
import {UpdateActorDto} from './dto/update-actor.dto';
import {Actor} from './actor.entity';

@EntityRepository(Actor)
export class ActorRepository extends Repository<Actor> {
    private logger = new Logger('ActorRepository');

    async createActor(dto: CreateActorDto): Promise<ActorInterface> {
        const {firstName, lastName, gender} = dto;
        const actor = new Actor();
        actor.firstName = firstName;
        actor.lastName = lastName;
        actor.gender = gender;
        await actor.save();

        return actor;
    }

    async updateActor(id: string, dto: UpdateActorDto): Promise<ActorInterface> {
        const actor = await this.findOne(id);

        if (!actor) {
            throw new NotFoundException('Actor does not exists. ');
        }

        actor.firstName = dto.firstName;
        actor.lastName = dto.lastName;
        actor.gender = dto.gender;
        await actor.save();

        return actor;
    }
}
