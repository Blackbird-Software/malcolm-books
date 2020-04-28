import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MovieRepository} from "./movie.repository";
import {MoviesController} from "./movies.controller";
import {MoviesService} from "./movies.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([MovieRepository]),
        AuthModule,
    ],
    controllers: [MoviesController],
    providers: [MoviesService],
})
export class MoviesModule {}