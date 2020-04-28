import {IsString, IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly premiere: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly description?: string;
}