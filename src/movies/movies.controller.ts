import {
    Body,
    Controller, Delete,
    Get, HttpCode,
    Logger,
    Param,
    ParseUUIDPipe, Patch,
    Post, Put,
    UseGuards,
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {MoviesService} from "./movies.service";
import {MovieInterface} from "./movie.interface";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";
import {GenresValidationPipes} from "./pipes/genres-validation.pipes";
import {ChangeGenresDto} from "./dto/change-genres.dto";
import {DirectorsValidationPipes} from "./pipes/directors-validation.pipes";
import {ChangeDirectorsDto} from "./dto/change-directors.dto";
import {GenreInterface} from "../genres/genre.interface";
import {DirectorInterface} from "../directors/director.interface";
import {ActorsValidationPipes} from "./pipes/actors-validation.pipes";
import {ActorInterface} from "../actors/actor.interface";
import {ChangeActorsDto} from "./dto/change-actors.dto";

@ApiBearerAuth()
@ApiTags('movies')
@Controller('movies')
@UseGuards(AuthGuard())
export class MoviesController {
    private logger = new Logger('MoviesController');

    constructor(private moviesService: MoviesService) {
    }

    @Post()
    create(@Body() dto: CreateMovieDto): Promise<MovieInterface> {
        return this.moviesService.create(dto);
    }

    @Put('/:id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateMovieDto
    ): Promise<MovieInterface> {
        return this.moviesService.update(id, dto);
    }

    @Patch('/:id/genres')
    changeGenres(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('genres', GenresValidationPipes) genres: GenreInterface[],
        @Body() dto: ChangeGenresDto
    ): Promise<MovieInterface> {
        return this.moviesService.changeGenres(id, genres);
    }

    @Patch('/:id/directors')
    changeDirectors(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('directors', DirectorsValidationPipes) directors: DirectorInterface[],
        @Body() dto: ChangeDirectorsDto
    ): Promise<MovieInterface> {
        return this.moviesService.changeDirectors(id, directors);
    }

    @Patch('/:id/actors')
    changeActors(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('actors', ActorsValidationPipes) actors: ActorInterface[],
        @Body() dto: ChangeActorsDto
    ): Promise<MovieInterface> {
        return this.moviesService.changeActors(id, actors);
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