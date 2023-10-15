/* eslint-disable import/no-extraneous-dependencies */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from 'domain/repositories/UserRepository';

import { type IPayloadJwtDTO } from '../dto/payload-jwt-dto.ts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
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
