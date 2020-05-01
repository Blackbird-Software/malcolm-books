import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsOptional, IsPositive} from 'class-validator';
import {Type} from 'class-transformer';

export class PaginationParamsDto {

    @ApiProperty()
    @Type(() => Number)
    @IsPositive()
    @IsInt()
    @IsOptional()
    readonly perPage?: number;

    @ApiProperty()
    @Type(() => Number)
    @IsPositive()
    @IsInt()
    @IsOptional()
    readonly page?: number;
}
