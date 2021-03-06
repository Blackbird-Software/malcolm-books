import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ActorRepository} from './actor.repository';
import {ActorsController} from './actors.controller';
import {ActorsService} from './actors.service';
import {LogsModule} from "../logs/logs.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ActorRepository]),
        LogsModule
    ],
    controllers: [ActorsController],
    providers: [ActorsService],
})
export class ActorsModule {}
