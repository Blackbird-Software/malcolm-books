import {
    Body,
    Controller, Delete,
    Get, HttpCode,
    Logger,
    Param,
    ParseUUIDPipe,
    Post, Put, UseGuards,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ActorsService} from './actors.service';
import {CreateActorDto} from './dto/create-actor.dto';
import {ActorInterface} from './actor.interface';
import {UpdateActorDto} from './dto/update-actor.dto';
import {GenderValidationPipe} from '../common/pipe/gender-validation.pipe';
import {Gender} from '../common/gender.enum';
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";

@UseGuards(JwtAuthGuard)
@ApiTags('actors')
@Controller('actors')
export class ActorsController {

    private readonly logger = new Logger('ActorsController');
    constructor(private readonly actorsService: ActorsService) {}

    @Post()
    create(
        @Body('gender', GenderValidationPipe) gender: Gender,
        @Body() dto: CreateActorDto,
    ): Promise<ActorInterface> {
        return this.actorsService.create(dto);
    }

    @Put('/:id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('gender', GenderValidationPipe) gender: Gender,
        @Body() dto: UpdateActorDto,
    ): Promise<ActorInterface> {
        return this.actorsService.update(id, dto);
    }

    @Get()
    getAll(): Promise<ActorInterface[]> {
        return this.actorsService.findAll();
    }

    @Get('/:id')
    getById(@Param('id', ParseUUIDPipe) id: string): Promise<ActorInterface> {
        return this.actorsService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(204)
    delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.actorsService.delete(id);
    }
}
