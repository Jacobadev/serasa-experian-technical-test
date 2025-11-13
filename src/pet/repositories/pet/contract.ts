import { Pet } from '@prisma/client';

export interface PetRepositoryContract {
  findById(id: number): Promise<Pet | null>;
  findByOwnerId(ownerId: number): Promise<Pet[]>;
  create(data: Partial<Pet>): Promise<Pet>;
  update(id: number, data: Partial<Pet>): Promise<Pet>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Pet[]>;
}

