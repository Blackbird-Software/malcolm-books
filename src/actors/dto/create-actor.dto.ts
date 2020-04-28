import {IsIn, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Gender} from "../../common/gender.enum";

export class CreateActorDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsIn([Gender.MALE, Gender.FEMALE])
    @IsNotEmpty()
    gender: Gender;
}