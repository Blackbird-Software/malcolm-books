import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FileRepository} from './file.repository';
import {FileInterface} from './file.interface';
import * as fs from 'fs';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FileRepository)
        private fileRepository: FileRepository,
    ) {
    }

    async create(file: any): Promise<FileInterface> {
        return this.fileRepository.createFile(file);
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
        } catch (e) {
            throw new InternalServerErrorException(`File with uuid "${id}" could not be deleted. `);
        }
    }

}
