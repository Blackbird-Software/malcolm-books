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
import {ApiTags} from "@nestjs/swagger";
import {MoviesService} from "./movies.service";
import {MovieInterface} from "./movie.interface";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";

@ApiTags('movies')
@Controller('movies')
@UseGuards(AuthGuard())
export class MoviesController {
    private logger = new Logger('MoviesController');

    constructor(private moviesService: MoviesService) {
    }

    @Post()
    createTask(@Body() dto: CreateMovieDto): Promise<MovieInterface> {
        return this.moviesService.create(dto);
    }

    @Put('/:id')
    updateTaskStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateMovieDto):
        Promise<MovieInterface> {
        return this.moviesService.update(id, dto);
    }

    @Get()
    getAll(): Promise<MovieInterface[]> {
        return this.moviesService.findAll();
    }

    @Get('/:id')
    getById(@Param('id', ParseUUIDPipe) id: string): Promise<MovieInterface> {
        return this.moviesService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(204)
    delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.moviesService.delete(id);
    }
}