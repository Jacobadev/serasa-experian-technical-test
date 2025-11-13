import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { BoatModule } from '@libs/boat';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '@app/auth/auth.module';
import { PetModule } from './pet';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    PrismaModule,
    BoatModule,
    UserModule,
    AuthModule,
    PetModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
