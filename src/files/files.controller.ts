import {
    BadRequestException,
    Controller, Delete,
    Get, HttpCode,
    Param, ParseUUIDPipe,
    Post,
    Res,
    UploadedFile, UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {editFileName} from './helper/edit-filename';
import {imageFileFilter} from './helper/image-file-filter';
import {diskStorage} from 'multer';
import {FilesService} from './files.service';
import {FileInterface} from './file.interface';
import {File} from './file.entity';
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";

@UseGuards(JwtAuthGuard)
@ApiTags('files')
@Controller('files')
export class FilesController {

    constructor(private readonly filesService: FilesService) {
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: File.DEFAULT_UPLOAD_PATH,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadFile(@UploadedFile() file): Promise<FileInterface> {

        if (!file) {
            throw new BadRequestException('Uploaded file is invalid. ');
        }

        return this.filesService.create(file);
    }

    @Get(':id/show')
    async serverFile(
        @Param('id', ParseUUIDPipe) id: string,
        @Res() response,
    ): Promise<any> {
        const file = await this.filesService.findById(id);
        response.sendFile(file.name, {root: File.DEFAULT_UPLOAD_PATH});
    }

    @Get()
    getAll(): Promise<FileInterface[]> {
        return this.filesService.findAll();
    }

    @Get('/:id')
    getById(@Param('id', ParseUUIDPipe) id: string): Promise<FileInterface> {
        return this.filesService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(204)
    delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.filesService.delete(id);
    }
}
