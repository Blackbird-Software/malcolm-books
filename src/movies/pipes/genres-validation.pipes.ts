import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {GenreInterface} from "../../genres/genre.interface";
import {GenresService} from "../../genres/genres.service";

@Injectable()
export class GenresValidationPipes implements PipeTransform {

    constructor(private genresService: GenresService) {
    }

    async transform(ids: any, metadata: ArgumentMetadata) {

        if(!Array.isArray(ids)) {
            throw new BadRequestException('Invalid arguments provided. ');
        }

        // possibly should check uuid correctness and
        // not return so early - instead collect all errors and merge them into one error message if possible?
        const genresPromise = ids.map(async id => await this.getGenre(id));
        return await Promise.all(genresPromise);
    }

    private async getGenre(id: string): Promise<GenreInterface> {
        return this.genresService.findById(id);
    }
}