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
import {GenresService} from "./genres.service";
import {GenreInterface} from "./genre.interface";
import {CreateGenreDto} from "./dto/create-genre.dto";
import {ApiTags} from "@nestjs/swagger";
import {UpdateGenreDto} from "./dto/update-genre.dto";

@ApiTags('genres')
@Controller('genres')
@UseGuards(AuthGuard())
export class GenresController {
    private logger = new Logger('TasksController');

    constructor(private genresService: GenresService) {
    }

    @Post()
    createTask(@Body() dto: CreateGenreDto): Promise<GenreInterface> {
        return this.genresService.create(dto);
    }

    @Put('/:id') updateTaskStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateGenreDto):
        Promise<GenreInterface> {
        return this.genresService.update(id, dto);
    }

    @Get()
    getAll(): Promise<GenreInterface[]> {
        return this.genresService.findAll();
    }

    @Get('/:id')
    getById(@Param('id', ParseUUIDPipe) id: string): Promise<GenreInterface> {
        return this.genresService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(204)
    delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.genresService.delete(id);
    }
}