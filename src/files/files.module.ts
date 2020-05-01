import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import {FilesController} from "./files.controller";
import {MulterModule} from "@nestjs/platform-express";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileRepository} from "./file.repository";
import {FilesService} from "./files.service";
import {File} from "./file.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([FileRepository]),
        AuthModule,
        MulterModule.register({
            dest: File.DEFAULT_UPLOAD_PATH,
        }),
    ],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}