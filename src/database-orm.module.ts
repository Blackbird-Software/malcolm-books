import {DynamicModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as config from './config/typeorm.config';

export function DatabaseOrmModule(): DynamicModule {
    return TypeOrmModule.forRoot(config);
}