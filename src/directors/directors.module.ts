import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DirectorRepository} from './director.repository';
import {DirectorsController} from './directors.controller';
import {DirectorsService} from './directors.service';
import {LogsModule} from "../logs/logs.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([DirectorRepository]),
        AuthModule,
        LogsModule
    ],
    controllers: [DirectorsController],
    providers: [DirectorsService],
})
export class DirectorsModule {}
