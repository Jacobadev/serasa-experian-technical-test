import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiOperation
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { PetService } from '../services';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { PetResponseDto } from '../dto/pet-response.dto';
import { GetUser } from '@app/user/decorator/user.decorator';
import { User } from '@prisma/client';

@ApiTags('Pets')
@Controller('/pets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiCreatedResponse({
    description: 'The pet has been successfully created.',
    type: PetResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. Token is invalid or not provided.' })
  async create(
    @Body() createPetDto: CreatePetDto,
    @GetUser() user: User,
  ): Promise<PetResponseDto> {
    return this.petService.create(createPetDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pets owned by the authenticated user' })
  @ApiOkResponse({
    description: 'Successfully retrieved all pets.',
    type: [PetResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. Token is invalid or not provided.' })
  async findAll(@GetUser() user: User): Promise<PetResponseDto[]> {
    return this.petService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific pet by ID' })
  @ApiOkResponse({
    description: 'Successfully retrieved the pet.',
    type: PetResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Pet not found.' })
  @ApiForbiddenResponse({ description: 'You do not have permission to access this pet.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. Token is invalid or not provided.' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<PetResponseDto> {
    return this.petService.findOne(id, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a pet by ID' })
  @ApiOkResponse({
    description: 'The pet has been successfully updated.',
    type: PetResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Pet not found.' })
  @ApiForbiddenResponse({ description: 'You do not have permission to update this pet.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. Token is invalid or not provided.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePetDto: UpdatePetDto,
    @GetUser() user: User,
  ): Promise<PetResponseDto> {
    return this.petService.update(id, updatePetDto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a pet by ID' })
  @ApiNoContentResponse({ description: 'The pet has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Pet not found.' })
  @ApiForbiddenResponse({ description: 'You do not have permission to delete this pet.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. Token is invalid or not provided.' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.petService.delete(id, user.id);
  }
}

