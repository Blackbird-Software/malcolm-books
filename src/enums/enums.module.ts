import { Module } from '@nestjs/common';
import {EnumsController} from './enums.controller';
import CountriesList from '../common/countries-list';

@Module({
    controllers: [EnumsController],
    providers: [CountriesList],
})
export class EnumsModule {}
