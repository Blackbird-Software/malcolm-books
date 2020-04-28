import {IsString, MinLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty()
  @IsEmail()
  @MinLength(4)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}