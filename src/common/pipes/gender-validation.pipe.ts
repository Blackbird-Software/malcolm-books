import {PipeTransform, BadRequestException, ArgumentMetadata, Injectable} from '@nestjs/common';
import {Gender} from '../gender.enum';

@Injectable()
export class GenderValidationPipe implements PipeTransform {

    readonly allowedOptions = [
        Gender.MALE,
        Gender.FEMALE,
    ];

    transform(value: any, metadata: ArgumentMetadata) {

        if (!value || !this.isValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;
    }

    private isValid(gender: any): boolean {
        return this.allowedOptions.indexOf(gender) !== -1;
    }
}
