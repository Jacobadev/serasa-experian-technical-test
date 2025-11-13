import { Appointment } from '@prisma/client';
import {CreateAppointmentDto} from "@app/appointment/dto/create-appointment.dto";
import {UpdateAppointmentDto} from "@app/appointment/dto/update-appointment.dto";

export interface IAppointmentRepository {
  create(
    createAppointmentDto: CreateAppointmentDto,
    petId: number,
  ): Promise<Appointment>;
  findAll(petId: number, date?: Date, service?: string): Promise<Appointment[]>;
  findOne(id: number, petId: number): Promise<Appointment | null>;
  update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment>;
  remove(id: number): Promise<void>;
}

