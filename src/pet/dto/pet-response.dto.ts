import { ApiProperty } from '@nestjs/swagger';

export class PetResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the pet.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "The pet's name.",
    example: 'Max',
  })
  name: string;

  @ApiProperty({
    description: "The pet's species.",
    example: 'Dog',
  })
  species: string;

  @ApiProperty({
    description: "The pet's age in years.",
    example: 3,
  })
  age: number;

  @ApiProperty({
    description: "The pet's weight in kilograms.",
    example: 15.5,
  })
  weight: number;

  @ApiProperty({
    description: 'Additional observations about the pet.',
    example: 'Friendly and energetic',
    required: false,
  })
  observations: string | null;

  @ApiProperty({
    description: 'The ID of the pet owner.',
    example: 1,
  })
  ownerId: number;

  @ApiProperty({
    description: 'The timestamp when the pet was created.',
    example: '2025-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the pet was last updated.',
    example: '2025-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
