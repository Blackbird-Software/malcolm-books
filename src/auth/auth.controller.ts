import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    HttpCode, UseGuards, Get,
} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';
import {ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {UserInterface} from "../users/user.interface";
import {GetUser} from "./decorators/get-user.decorator";
import {JwtResponseInterface} from "./jwt/jwt-response.interface";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }

    @Post('/token')
    @HttpCode(200)
    login(@Body(ValidationPipe) dto: LoginDto): Promise<JwtResponseInterface> {
        return this.authService.login(dto);
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: UserInterface): UserInterface {
        return user;
    }
}
