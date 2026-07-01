import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MockService } from '../mock/mock.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mockService: MockService,
  ) {}

  async register(email: string, password: string, role: string) {
    const existing = this.mockService.findUserByEmail(email);
    if (existing) throw new UnauthorizedException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.mockService.createUser({ email, password: hashedPassword, role });

    const payload = { sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: { email: user.email, role: user.role },
    };
  }

  async login(email: string, password: string) {
    const user = this.mockService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: { email: user.email, role: user.role },
    };
  }
}
