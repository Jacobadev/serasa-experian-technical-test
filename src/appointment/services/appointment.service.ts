import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { AppointmentRepository } from '../repositories/appointment/database';
import { PetRepository } from '@app/pet/repositories/pet/database';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly petRepository: PetRepository,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    const pet = await this.petRepository.findOne({
      id: createAppointmentDto.petId,
      userId,
    });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return this.appointmentRepository.create({
      data: {
        ...createAppointmentDto,
        pet: {
          connect: {
            id: createAppointmentDto.petId,
          },
        },
      },
    });
  }

  async findAll(userId: number, date?: string, service?: string) {
    return this.appointmentRepository.find({
      where: {
        pet: {
          userId,
        },
        date: date ? { gte: new Date(date) } : undefined,
        service: service ? { contains: service } : undefined,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const appointment = await this.appointmentRepository.findOne({
      id,
      pet: {
        userId,
      },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
    userId: number,
  ) {
    await this.findOne(id, userId);
    return this.appointmentRepository.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    await this.appointmentRepository.delete({ id });
  }
}

