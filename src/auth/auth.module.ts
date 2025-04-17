import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailConfirmationModule } from 'src/email-confirmation/email-confirmation.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[UsersModule,JwtModule,EmailConfirmationModule]
})
export class AuthModule {}
