import {PipeTransform, BadRequestException, ArgumentMetadata, Injectable} from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class YearValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        if (!YearValidationPipe.isValid(value)) {
            throw new BadRequestException('Invalid date provided. ');
        }

        return moment(value).format('YYYY');
    }

    private static isValid(year: any): boolean {
        return moment(year, 'YYYY', true).isValid();
    }
}
