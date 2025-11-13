import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentRepository } from './repositories/appointment/database';
import { PetModule } from 'src/pet/pet.module';

@Module({
  imports: [PetModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
})
export class AppointmentModule {}
