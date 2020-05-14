import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FileRepository} from './file.repository';
import {FileInterface} from './file.interface';
import * as fs from 'fs';
import {LogsService} from "../logs/logs.service";
import {ActionType} from "../logs/enum/action-types";

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FileRepository) private fileRepository: FileRepository,
        private readonly logsService: LogsService
    ) {
    }

    async create(file: any): Promise<FileInterface> {
        const savedFile = await this.fileRepository.createFile(file);
        await this.logsService.sendMessage(savedFile, ActionType.CREATE);

        return savedFile;
    }

    async findAll(): Promise<FileInterface[]> {
        return this.fileRepository.find();
    }

    async findById(id: string): Promise<FileInterface> {
        const found = await this.fileRepository.findOne(id);

        if (!found) {
            throw new NotFoundException('File not found. ');
        }

        return found;
    }

    async delete(id: string): Promise<void> {
        const file = await this.findById(id);
        const result = await this.fileRepository.delete(id);

        try {
            fs.unlinkSync(file.path);
            await this.logsService.sendMessage(file, ActionType.DELETE);
        } catch (e) {
            throw new InternalServerErrorException(`File with uuid "${id}" could not be deleted. `);
        }
    }

}
