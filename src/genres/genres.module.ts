import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import {GenresService} from './genres.service';
import {GenresController} from './genres.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GenreRepository} from './genre.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([GenreRepository]),
        AuthModule,
    ],
    controllers: [GenresController],
    providers: [GenresService],
})
export class GenresModule {}
