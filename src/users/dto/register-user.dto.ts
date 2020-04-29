import {IsString, MinLength, IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}
