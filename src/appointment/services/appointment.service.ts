import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { AppointmentRepository } from '../repositories/appointment/database';
import { PetRepositoryContract } from '@app/pet/repositories';
import { PetModuleConstants } from '@app/pet/constants';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    @Inject(PetModuleConstants.petRepo)
    private readonly petRepository: PetRepositoryContract,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    const pet = await this.petRepository.findById(createAppointmentDto.petId);
    if (!pet || pet.ownerId !== userId) {
      throw new NotFoundException('Pet not found');
    }
    return this.appointmentRepository.create(
      createAppointmentDto,
      createAppointmentDto.petId,
    );
  }

  async findAll(userId: number, date?: string, service?: string) {
    const pets = await this.petRepository.findByOwnerId(userId);
    const petIds = pets.map((pet) => pet.id);

    const allAppointments = await Promise.all(
      petIds.map((petId) =>
        this.appointmentRepository.findAll(
          petId,
          date ? new Date(date) : undefined,
          service,
        ),
      ),
    );

    return allAppointments.flat();
  }

  async findOne(id: number, userId: number) {
    const pets = await this.petRepository.findByOwnerId(userId);
    const petIds = pets.map((pet) => pet.id);

    for (const petId of petIds) {
      const appointment = await this.appointmentRepository.findOne(id, petId);
      if (appointment) {
        return appointment;
      }
    }

    throw new NotFoundException('Appointment not found');
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
    userId: number,
  ) {
    await this.findOne(id, userId);
    return this.appointmentRepository.update(id, updateAppointmentDto);
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    await this.appointmentRepository.remove(id);
  }
}
