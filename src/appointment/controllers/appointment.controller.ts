import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserResponseDto } from '@app/user/dto/user-response.dto';
import { AppointmentResponseDto } from '../dto/appointment-response.dto';
import { GetUser } from '@app/user/decorator/user.decorator';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({
    status: 201,
    description: 'The appointment has been successfully created.',
    type: AppointmentResponseDto,
  })
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @GetUser() user: UserResponseDto,
  ): Promise<AppointmentResponseDto> {
    return this.appointmentService.create(createAppointmentDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List all appointments for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'A list of appointments.',
    type: [AppointmentResponseDto],
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Filter appointments by date',
  })
  @ApiQuery({
    name: 'service',
    required: false,
    description: 'Filter appointments by service',
  })
  findAll(
    @GetUser() user: UserResponseDto,
    @Query('date') date?: string,
    @Query('service') service?: string,
  ): Promise<AppointmentResponseDto[]> {
    return this.appointmentService.findAll(user.id, date, service);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an appointment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The appointment data.',
    type: AppointmentResponseDto,
  })
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserResponseDto,
  ): Promise<AppointmentResponseDto> {
    return this.appointmentService.findOne(+id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an appointment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The appointment has been successfully updated.',
    type: AppointmentResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @GetUser() user: UserResponseDto,
  ): Promise<AppointmentResponseDto> {
    return this.appointmentService.update(+id, updateAppointmentDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment by ID' })
  @ApiResponse({
    status: 204,
    description: 'The appointment has been successfully deleted.',
  })
  remove(
    @Param('id') id: string,
    @GetUser() user: UserResponseDto,
  ): Promise<void> {
    return this.appointmentService.remove(+id, user.id);
  }
}
