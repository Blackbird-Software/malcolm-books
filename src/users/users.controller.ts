import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Res,
    HttpStatus,
} from '@nestjs/common';
import {Response} from 'express';
import {ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {RegisterUserDto} from "./dto/register-user.dto";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) {
    }

    @Post()
    async register(@Body(ValidationPipe) dto: RegisterUserDto, @Res() res: Response) {
        const user = await this.usersService.register(dto);
        res.status(HttpStatus.OK).json(user);
    }
}
