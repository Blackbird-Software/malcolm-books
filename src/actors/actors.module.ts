import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ActorRepository} from './actor.repository';
import {ActorsController} from './actors.controller';
import {ActorsService} from './actors.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ActorRepository]),
        AuthModule,
    ],
    controllers: [ActorsController],
    providers: [ActorsService],
})
export class ActorsModule {}
