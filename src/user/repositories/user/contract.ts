import { User } from '@prisma/client';

export interface UserRepositoryContract {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  firstWhere(conditions: Partial<User>): Promise<User | null>;
  create(data: Partial<User>): Promise<User>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}
