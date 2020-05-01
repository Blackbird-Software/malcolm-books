import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FileRepository} from "./file.repository";
import {FileInterface} from "./file.interface";

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

    // async update(id: string, dto: UpdateDirectorDto): Promise<DirectorInterface> {
    //     return this.directorRepository.updateDirector(id, dto);
    // }
    //
    // async findAll(): Promise<DirectorInterface[]> {
    //     return this.directorRepository.find();
    // }
    //
    // async findById(id: string): Promise<DirectorInterface> {
    //     const found = await this.directorRepository.findOne(id);
    //
    //     if (!found) {
    //         throw new NotFoundException('Director not found. ');
    //     }
    //
    //     return found;
    // }
    //
    // async delete(id: string): Promise<void> {
    //     const result = await this.directorRepository.delete(id);
    //
    //     if (result.affected === 0) {
    //         throw new NotFoundException(`Director with uuid "${id}" not found. `);
    //     }
    // }

}
