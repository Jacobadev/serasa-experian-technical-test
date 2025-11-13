import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsISO8601,
  Matches,
} from 'class-validator';

export class SignupRequestDto {
  @ApiProperty({
    description: "The user's full name.",
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The user's unique email address.",
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The user's password. Must be at least 8 characters long",
    example: 'password1234',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
