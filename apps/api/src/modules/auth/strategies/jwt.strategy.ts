import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

type RequestWithCookies = Request & {
  cookies: { jwt?: string };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: RequestWithCookies): string | null => req.cookies?.jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: String(process.env.JWT_SECRET),
    });
  }

  validate(payload: { username: string; sub: string }): { userId: string; username: string } {
    return { userId: payload.sub, username: payload.username };
  }
}
