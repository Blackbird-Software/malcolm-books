import {IsString, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateGenreDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;
}