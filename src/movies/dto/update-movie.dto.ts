import {IsString, IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateMovieDto {
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

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly country: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly cover: string;
}
