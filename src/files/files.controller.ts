import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName} from "./helper/edit-filename";
import {imageFileFilter} from "./helper/image-file-filter";
import {diskStorage} from 'multer';
import {FilesService} from "./files.service";
import {FileInterface} from "./file.interface";
import {File} from "./file.entity";


@ApiBearerAuth()
@ApiTags('files')
@Controller('files')
@UseGuards(AuthGuard())
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

    @Get(':path/show')
    async serverFile(@Param('path') path, @Res() res): Promise<any> {
        res.sendFile(path, {root: File.DEFAULT_UPLOAD_PATH});
    }

    // @Put('/:id')
    // update(
    //     @Param('id', ParseUUIDPipe) id: string,
    //     @Body() dto: UpdateGenreDto):
    //     Promise<FileInterface> {
    //     return this.genresService.update(id, dto);
    // }
    //
    // @Get()
    // getAll(): Promise<FileInterface[]> {
    //     return this.genresService.findAll();
    // }
    //
    // @Get('/:id')
    // getById(@Param('id', ParseUUIDPipe) id: string): Promise<FileInterface> {
    //     return this.genresService.findById(id);
    // }
    //
    // @Delete('/:id')
    // @HttpCode(204)
    // delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    //     return this.genresService.delete(id);
    // }
}
