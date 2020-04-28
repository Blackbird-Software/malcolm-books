import {IsString, IsNotEmpty, IsIn} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Gender} from "../../common/gender.enum";

export class UpdateActorDto {
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