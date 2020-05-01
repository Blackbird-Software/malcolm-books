import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {FilesService} from '../files.service';
import {isUUID} from '@nestjs/common/utils/is-uuid';

@Injectable()
export class FileValidationPipe implements PipeTransform {

    constructor(private filesService: FilesService) {
    }

    async transform(value: any, metadata: ArgumentMetadata) {

        if (!isUUID(value, '4')) {
            throw new BadRequestException('Not valid uuid. ');
        }

        try {
            return await this.filesService.findById(value);
        } catch (exception) {
            throw new BadRequestException('Invalid file provided. ');
        }
    }
}
