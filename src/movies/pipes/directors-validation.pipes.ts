import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {DirectorsService} from "../../directors/directors.service";
import {DirectorInterface} from "../../directors/director.interface";

@Injectable()
export class DirectorsValidationPipes implements PipeTransform {

    constructor(private directorsService: DirectorsService) {
    }

    async transform(ids: any, metadata: ArgumentMetadata) {

        if (!Array.isArray(ids)) {
            throw new BadRequestException('Invalid arguments provided. ');
        }

        // possibly should check uuid correctness and
        // not return so early - instead collect all errors and merge them into one error message if possible?
        const directorsPromises = ids.map(async id => await this.getDirector(id));
        return await Promise.all(directorsPromises);
    }

    private async getDirector(id: string): Promise<DirectorInterface> {
        return this.directorsService.findById(id);
    }
}