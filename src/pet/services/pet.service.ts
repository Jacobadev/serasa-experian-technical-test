import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PetRepositoryContract } from '../repositories';
import { PetModuleConstants } from '../constants';
import { Pet } from '@prisma/client';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { PetResponseDto } from '../dto/pet-response.dto';

@Injectable()
export class PetService {
  constructor(
    @Inject(PetModuleConstants.petRepo)
    private readonly pets: PetRepositoryContract,
  ) {}

  async findAll(userId?: number): Promise<PetResponseDto[]> {
    if (userId) {
      return this.pets.findByOwnerId(userId);
    }
    return this.pets.findAll();
  }

  async findOne(id: number, userId?: number): Promise<PetResponseDto> {
    const pet = await this.pets.findById(id);

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found.`);
    }

    if (userId && pet.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this pet.',
      );
    }

    return pet;
  }

  async create(
    createPetDto: CreatePetDto,
    ownerId: number,
  ): Promise<PetResponseDto> {
    const newPet = await this.pets.create({
      ...createPetDto,
      ownerId,
    });

    return newPet;
  }

  async update(
    id: number,
    updatePetDto: UpdatePetDto,
    userId?: number,
  ): Promise<PetResponseDto> {
    const pet = await this.pets.findById(id);

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found.`);
    }

    if (userId && pet.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this pet.',
      );
    }

    return this.pets.update(id, updatePetDto);
  }

  async delete(id: number, userId?: number): Promise<void> {
    const pet = await this.pets.findById(id);

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found.`);
    }

    if (userId && pet.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this pet.',
      );
    }

    await this.pets.delete(id);
  }
}
