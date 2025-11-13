import { Injectable } from '@nestjs/common';
import { UserRepositoryContract } from './contract';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserRepository implements UserRepositoryContract {
  constructor(private prisma: PrismaClient) {}

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async firstWhere(conditions: Partial<User>): Promise<User | null> {
    return this.prisma.user.findFirst({ where: conditions as any });
  }

  async create(data: Partial<User>): Promise<User> {
    return this.prisma.user.create({ data: data as any });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: data as any });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
