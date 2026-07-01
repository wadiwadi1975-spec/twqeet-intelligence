import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MockModule } from '../mock/mock.module';

@Module({
  imports: [
    MockModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'twqeet-jwt-secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
