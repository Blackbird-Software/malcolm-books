import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {ActorInterface} from '../../actors/actor.interface';
import {ActorsService} from '../../actors/actors.service';

@Injectable()
export class ActorsValidationPipe implements PipeTransform {

    constructor(private actorsService: ActorsService) {
    }

    async transform(ids: any, metadata: ArgumentMetadata) {

        if (!Array.isArray(ids)) {
            throw new BadRequestException('Invalid arguments provided. ');
        }

        // possibly should check uuid correctness and
        // not return so early - instead collect all errors and merge them into one error message if possible?
        const actorsPromises = ids.map(async id => await this.getActor(id));
        return await Promise.all(actorsPromises);
    }

    private async getActor(id: string): Promise<ActorInterface> {
        return this.actorsService.findById(id);
    }
}
