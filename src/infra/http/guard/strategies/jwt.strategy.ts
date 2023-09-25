import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from 'domain/repositories/UserRepository';

import { env } from 'infra/env';
import { type IPayloadJwtDTO } from 'infra/http/guard/dtos/PayloadJwtDTO';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_KEY,
    });
  }

  async validate(payload: IPayloadJwtDTO) {
    const { id } = payload;

    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UnauthorizedException('invalid token');
    }

    return user;
  }
}
