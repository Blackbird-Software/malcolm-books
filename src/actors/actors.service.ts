import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateActorDto} from "./dto/create-actor.dto";
import {ActorRepository} from "./actor.repository";
import {ActorInterface} from "./actor.interface";
import {UpdateActorDto} from "./dto/update-actor.dto";

@Injectable()
export class ActorsService {
    constructor(
        @InjectRepository(ActorRepository)
        private directorRepository: ActorRepository,
    ) {
    }

    async create(dto: CreateActorDto): Promise<ActorInterface> {
        return this.directorRepository.createActor(dto);
    }

    async update(id: string, dto: UpdateActorDto): Promise<ActorInterface> {
        return this.directorRepository.updateActor(id, dto);
    }

    findAll(): Promise<ActorInterface[]> {
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
        const result = await this.directorRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Actor with uuid "${id}" not found. `);
        }
    }

}