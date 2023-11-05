import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { GraphQLError } from 'graphql';

import {
  type ISignInRequestDTO,
  type ISignInResponseDTO,
} from 'domain/repositories/AuthDTO/AuthRepositoryDto';
import { type AuthRepository } from 'domain/repositories/AuthRepository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { UserPrismaDTO } from './prismaDTO/UserPrismaDto';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class AuthServicePrisma implements AuthRepository {
  constructor(
    private jwtService: JwtService,
    private userRepositoty: UserRepository,
  ) {}

  async signIn(credentials: ISignInRequestDTO): Promise<ISignInResponseDTO> {
    const userPrisma = await this.userRepositoty.findUserByEmail(
      credentials.email,
    );

    if (!userPrisma) {
      throw new GraphQLError('E-mail not found!', {
        extensions: { code: HttpStatus.UNAUTHORIZED },
      });
    }

    const shouldPasswordMatch = await compare(
      credentials.password,
      userPrisma.password,
    );

    if (!shouldPasswordMatch) {
      throw new GraphQLError('Password incorrect!', {
        extensions: { code: HttpStatus.UNAUTHORIZED },
      });
    }

    const user = UserPrismaDTO.PrismaToEntity(userPrisma);

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_KEY,
      expiresIn: '2d',
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      username: user.username,
      updated_at: user.updated_at,
      created_at: user.created_at,
      token,
    };
  }
}
