import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "The user's Email" })
  readonly email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({ description: "The user's Password" })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: "The user's Role" })
  readonly role: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty({ description: 'The Customer Id' })
  readonly customerId: number;
}
