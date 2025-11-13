import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {UserModule, UserService} from '@app/user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import {JwtStrategy} from "@app/auth/strategies/jwt.strategy";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,

  ],
  providers: [AuthService,UserService,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
