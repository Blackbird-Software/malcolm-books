import { Module } from '@nestjs/common';
import {GenresService} from './genres.service';
import {GenresController} from './genres.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GenreRepository} from './genre.repository';
import {LogsModule} from "../logs/logs.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([GenreRepository]),
        LogsModule,
    ],
    controllers: [GenresController],
    providers: [GenresService],
})
export class GenresModule {}
