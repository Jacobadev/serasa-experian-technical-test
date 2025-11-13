import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdatePetDto {
  @ApiProperty({
    description: 'The pet\'s name.',
    example: 'Max',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The pet\'s species.',
    example: 'Dog',
    required: false,
  })
  @IsString()
  @IsOptional()
  species?: string;

  @ApiProperty({
    description: 'The pet\'s age in years.',
    example: 3,
    minimum: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'The pet\'s weight in kilograms.',
    example: 15.5,
    minimum: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  weight?: number;

  @ApiProperty({
    description: 'Additional observations about the pet.',
    example: 'Friendly and energetic',
    required: false,
  })
  @IsString()
  @IsOptional()
  observations?: string;
}

