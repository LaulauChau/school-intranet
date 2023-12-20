import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@repo/database';

import { UtilsService } from '~/common/services/utils.service';
import { UsersService } from '~/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService,
  ) {}

  login(user: Omit<User, 'password'>): string {
    const payload = { username: user.email, sub: user.id };

    return this.jwtService.sign(payload);
  }

  async register(
    name: string,
    email: string,
    password: string,
    role: 'TEACHER' | 'STUDENT',
  ): Promise<Omit<User, 'passowrd'>> {
    return this.usersService.create({ name, email, password, role });
  }

  async validateToken(token: string): Promise<Omit<User, 'password'>> {
    const { sub } = this.jwtService.decode(token) as { username: string; sub: string };

    const user = await this.usersService.findOne({ id: sub });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.utilsService.excludeFields(user, ['password']);
  }

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne({ email: email });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await this.utilsService.verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.utilsService.excludeFields(user, ['password']);
  }
}
