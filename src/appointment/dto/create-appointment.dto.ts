import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    example: '2025-12-31T10:00:00Z',
    description: 'The date of the appointment',
  })
  @IsDateString()
  date: Date;

  @ApiProperty({ example: 'Vaccination', description: 'The service to be performed' })
  @IsString()
  service: string;

  @ApiProperty({
    example: 'Annual vaccination',
    description: 'Additional observations about the appointment',
    required: false,
  })
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiProperty({ example: 1, description: 'The ID of the pet' })
  @IsString()
  petId: number;
}

