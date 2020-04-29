import {IsOptional, IsNotEmpty} from 'class-validator';

export class GetMoviesFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
