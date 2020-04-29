import {IsString, MinLength, IsEmail} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @MinLength(4)
    readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}
