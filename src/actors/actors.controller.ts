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
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {ActorsService} from "./actors.service";
import {CreateActorDto} from "./dto/create-actor.dto";
import {ActorInterface} from "./actor.interface";
import {UpdateActorDto} from "./dto/update-actor.dto";
import {GenderValidationPipe} from "../common/pipes/gender-validation.pipe";
import {Gender} from "../common/gender.enum";

@ApiTags('actors')
@ApiBearerAuth()
@Controller('actors')
@UseGuards(AuthGuard())
export class ActorsController {
    private logger = new Logger('ActorsController');

    constructor(private actorsService: ActorsService) {
    }

    @Post()
    create(
        @Body('gender', GenderValidationPipe) gender: Gender,
        @Body() dto: CreateActorDto
    ): Promise<ActorInterface> {
        console.log('dto', dto);
        return this.actorsService.create(dto);
    }

    @Put('/:id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('gender', GenderValidationPipe) gender: Gender,
        @Body() dto: UpdateActorDto
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