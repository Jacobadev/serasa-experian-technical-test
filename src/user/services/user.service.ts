import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories';
import { UserModuleConstants } from '../constants';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserResponseDto } from '@app/auth/dto/user-response-dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModuleConstants.userRepo)
    private readonly users: UserRepositoryContract,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.users.findByEmail(email);
  }
  async findById(id: number): Promise<User | null> {
    return this.users.findById(id);
  }

  /**
   * Creates a new user in the database.
   * @param createUserDto - The data required to create a user.
   * @returns A promise that resolves to the created user's public data.
   * @throws {ConflictException} If a user with the same email already exists.
   */
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.users.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('A user with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.users.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }
}
