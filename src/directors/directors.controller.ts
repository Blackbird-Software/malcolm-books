import {
    Body,
    Controller, Delete,
    Get, HttpCode,
    Logger,
    Param,
    ParseUUIDPipe,
    Post, Put,
    UseGuards,
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateDirectorDto} from "./dto/create-director.dto";
import {ApiTags} from "@nestjs/swagger";
import {DirectorsService} from "./directors.service";
import {UpdateDirectorDto} from "./dto/update-director.dto";
import {DirectorInterface} from "./director.interface";

@ApiTags('directors')
@Controller('directors')
@UseGuards(AuthGuard())
export class DirectorsController {
    private logger = new Logger('DirectorsController');

    constructor(private directorsService: DirectorsService) {
    }

    @Post()
    create(@Body() dto: CreateDirectorDto): Promise<DirectorInterface> {
        return this.directorsService.create(dto);
    }

    @Put('/:id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateDirectorDto):
        Promise<DirectorInterface> {
        return this.directorsService.update(id, dto);
    }

    @Get()
    getAll(): Promise<DirectorInterface[]> {
        return this.directorsService.findAll();
    }

    @Get('/:id')
    getById(@Param('id', ParseUUIDPipe) id: string): Promise<DirectorInterface> {
        return this.directorsService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(204)
    delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.directorsService.delete(id);
    }
}