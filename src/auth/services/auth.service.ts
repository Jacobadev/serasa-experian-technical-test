import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModuleConstants } from '@app/user/constants';
import { UserRepositoryContract } from '@app/user/repositories';
import { LoginRequestDto, LoginResponseDto } from '../dto/login.dto';
import { UserResponseDto } from '@app/user/dto/user-response.dto';
import { JwtPayload } from '../interfaces/jwt.payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserModuleConstants.userRepo)
    private readonly userRepository: UserRepositoryContract,
  ) {}

  /**
   * Authenticates a user based on their email and password.
   * @param loginRequestDto - The login credentials.
   * @returns A promise that resolves to an object containing the access token.
   * @throws {UnauthorizedException} If the credentials are invalid.
   */
  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = loginRequestDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUserFromJwt(payload: JwtPayload): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    const { password, ...result } = user;
    return result;
  }
}
