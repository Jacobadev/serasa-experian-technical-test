import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { BoatModule } from '@libs/boat';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from "@app/auth/auth.module";
import { PetModule } from './pet';

@Module({
    imports: [
        PrismaModule,
        BoatModule,
        UserModule,
        AuthModule,
        PetModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
