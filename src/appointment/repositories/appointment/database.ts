import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto } from 'src/appointment/dto/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/appointment/dto/update-appointment.dto';
import { IAppointmentRepository } from './contract';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
    petId: number,
  ): Promise<Appointment> {
    const { petId: dtoPetId, ...rest } = createAppointmentDto;
    return this.prisma.appointment.create({
      data: {
        ...rest,
        pet: {
          connect: { id: petId },
        },
      },
    });
  }

  async findAll(
    petId: number,
    date?: Date,
    service?: string,
  ): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      where: {
        petId,
        date: date ? { gte: date } : undefined,
        service: service ? { contains: service } : undefined,
      },
    });
  }

  async findOne(id: number, petId: number): Promise<Appointment | null> {
    return this.prisma.appointment.findFirst({
      where: { id, petId },
    });
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.appointment.delete({ where: { id } });
  }
}
