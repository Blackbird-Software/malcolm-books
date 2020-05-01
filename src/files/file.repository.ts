import {EntityRepository, Repository} from 'typeorm';
import {FileInterface} from "./file.interface";
import {File} from "./file.entity";

@EntityRepository(File)
export class FileRepository extends Repository<File> {

    async createFile(uploadedFile: any): Promise<FileInterface> {

        const file = new File();
        file.path = uploadedFile.path;
        file.name = uploadedFile.filename;
        file.originalName = uploadedFile.originalname;
        await file.save();

        return file;
    }
}
