import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {Director} from "../../directors/director.entity";

export class ChangeDirectorsDto {
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => Director)
    @IsArray()
    @IsNotEmpty()
    directors: Director[];
}