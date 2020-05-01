import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import CountriesList from '../common/countries-list';

@ApiTags('enums')
@Controller('enums')
export class EnumsController {

    constructor(private readonly countriesService: CountriesList) {}

    @Get('/countries')
    getAll(): any {
        return this.countriesService.all();
    }
}
