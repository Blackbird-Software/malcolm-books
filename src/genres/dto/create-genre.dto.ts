import {IsString, IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateGenreDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;
}