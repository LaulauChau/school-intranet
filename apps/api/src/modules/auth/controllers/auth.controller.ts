import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { User } from '@repo/database';
import { Response as ExpressResponse, type Request as ExpressRequest } from 'express';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

interface RequestWithCookies extends ExpressRequest {
  cookies: { jwt: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: User }, @Response() res: ExpressResponse): ExpressResponse {
    const accessToken = this.authService.login(req.user);

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res
      .status(HttpStatus.OK)
      .send({ statusCode: HttpStatus.OK, message: 'Login successful' });
  }

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: 'TEACHER' | 'STUDENT',
    @Response() res: ExpressResponse,
  ): Promise<ExpressResponse> {
    const user = await this.authService.register(name, email, password, role);

    const accessToken = this.authService.login(user);

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, message: 'Register successful' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Response() res: ExpressResponse): ExpressResponse {
    res.clearCookie('jwt');

    return res
      .status(HttpStatus.OK)
      .send({ statusCode: HttpStatus.OK, message: 'Logout successful' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Response() res, @Request() req: RequestWithCookies): Promise<ExpressResponse> {
    const { jwt } = req.cookies;

    const user = await this.authService.validateToken(jwt);

    if (!user) {
      throw new UnauthorizedException();
    }

    return res
      .status(HttpStatus.OK)
      .send({ statusCode: HttpStatus.OK, message: 'Success', data: user });
  }
}
