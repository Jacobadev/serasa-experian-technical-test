import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({
    description: 'The pet\'s name.',
    example: 'Max',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The pet\'s species.',
    example: 'Dog',
  })
  @IsString()
  @IsNotEmpty()
  species: string;

  @ApiProperty({
    description: 'The pet\'s age in years.',
    example: 3,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({
    description: 'The pet\'s weight in kilograms.',
    example: 15.5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty({
    description: 'Additional observations about the pet.',
    example: 'Friendly and energetic',
    required: false,
  })
  @IsString()
  @IsOptional()
  observations?: string;
}

