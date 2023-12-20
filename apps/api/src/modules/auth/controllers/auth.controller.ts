import { Controller, Get, HttpStatus, Post, Request, Response, UseGuards } from '@nestjs/common';
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

    return res.status(HttpStatus.OK).send({ message: 'Login successful' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Response() res: ExpressResponse): ExpressResponse {
    res.clearCookie('jwt');

    return res.status(HttpStatus.OK).send({ message: 'Logout successful' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req: RequestWithCookies): Promise<Omit<User, 'password'> | null> {
    const { jwt } = req.cookies;

    const user = await this.authService.validateToken(jwt);

    return user;
  }
}
