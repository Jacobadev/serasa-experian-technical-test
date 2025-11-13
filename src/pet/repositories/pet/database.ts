import { Injectable } from '@nestjs/common';
import { PetRepositoryContract } from './contract';
import { PrismaClient, Pet } from '@prisma/client';

@Injectable()
export class PetRepository implements PetRepositoryContract {
  constructor(private prisma: PrismaClient) {}

  async findById(id: number): Promise<Pet | null> {
    return this.prisma.pet.findUnique({ where: { id } });
  }

  async findByOwnerId(ownerId: number): Promise<Pet[]> {
    return this.prisma.pet.findMany({ where: { ownerId } });
  }

  async create(data: Partial<Pet>): Promise<Pet> {
    return this.prisma.pet.create({ data: data as any });
  }

  async update(id: number, data: Partial<Pet>): Promise<Pet> {
    return this.prisma.pet.update({ where: { id }, data: data as any });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.pet.delete({ where: { id } });
  }

  async findAll(): Promise<Pet[]> {
    return this.prisma.pet.findMany();
  }
}

