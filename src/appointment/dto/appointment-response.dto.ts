import { ApiProperty } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';

export class AppointmentResponseDto extends CreateAppointmentDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the appointment',
  })
  id: number;
}

