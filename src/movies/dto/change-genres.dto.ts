import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, ValidateNested} from "class-validator";
import {Genre} from "../../genres/genre.entity";
import {Type} from "class-transformer";

export class ChangeGenresDto {
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => Genre)
    @IsArray()
    @IsNotEmpty()
    genres: Genre[];
}