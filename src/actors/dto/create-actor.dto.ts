import {IsIn, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Gender} from "../../common/gender.enum";

export class CreateActorDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsIn([Gender.MALE, Gender.FEMALE])
    @IsNotEmpty()
    readonly gender: Gender;
}