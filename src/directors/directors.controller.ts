import {
    Body,
    Controller, Delete,
    Get, HttpCode,
    Logger,
    Param,
    ParseUUIDPipe,
    Post, Put, UseGuards,
} from '@nestjs/common';
import {CreateDirectorDto} from './dto/create-director.dto';
import {ApiTags} from '@nestjs/swagger';
import {DirectorsService} from './directors.service';
import {UpdateDirectorDto} from './dto/update-director.dto';
import {DirectorInterface} from './director.interface';
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";

@UseGuards(JwtAuthGuard)
@ApiTags('directors')
@Controller('directors')
export class DirectorsController {

    private logger = new Logger('DirectorsController');
    constructor(private readonly directorsService: DirectorsService) {}

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
