import {
  Controller,
  Get,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserService } from '@app/user/services';
import { User } from '@prisma/client';
import { GetUser } from '@app/user/decorator/user.decorator';
import { UserResponseDto } from '@app/user/dto/user-response.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Successfully retrieved user profile data.',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Token is invalid or not provided.',
  })
  getProfile(@GetUser() user: User): UserResponseDto {
    if (!user) {
      throw new InternalServerErrorException(
        'Authenticated user not found in request.',
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
