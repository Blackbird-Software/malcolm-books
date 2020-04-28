import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DirectorRepository} from "./director.repository";
import {DirectorsController} from "./directors.controller";
import {DirectorsService} from "./directors.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([DirectorRepository]),
        AuthModule,
    ],
    controllers: [DirectorsController],
    providers: [DirectorsService],
})
export class DirectorsModule {}