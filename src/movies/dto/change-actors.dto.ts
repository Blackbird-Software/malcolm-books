import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsNotEmpty, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {Actor} from '../../actors/actor.entity';

export class ChangeActorsDto {
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => Actor)
    @IsArray()
    @IsNotEmpty()
    readonly directors: Actor[];
}
