import {PipeTransform, BadRequestException, ArgumentMetadata, Injectable} from '@nestjs/common';
import {format, isValid, parseISO} from 'date-fns';

@Injectable()
export class YearValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        if (!YearValidationPipe.checkIfValid(value)) {
            throw new BadRequestException('Invalid date provided. ');
        }

        return format(parseISO(value), 'yyyy');
    }

    public static checkIfValid(value: any): boolean {
        const dt = new Date(value, 0, 0);

        return isValid(dt);
    }
}
