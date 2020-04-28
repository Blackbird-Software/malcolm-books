import {IsString, MinLength, IsEmail, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string;
}