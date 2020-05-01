import {PipeTransform, BadRequestException, ArgumentMetadata, Injectable} from '@nestjs/common';
import CountriesList from '../countries-list';
import Country from '../country';

@Injectable()
export class CountryValidationPipe implements PipeTransform {

    constructor(private readonly countriesService: CountriesList) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const keys = this.countriesService.keys();

        if (!keys.includes(value)) {
            throw new BadRequestException('Incorrect country code provided. ');
        }

        return Country.createFromCode(value);
    }
}
