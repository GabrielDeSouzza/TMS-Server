import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { GraphQLError } from 'graphql';

import {
  type ISignInResponseDTO,
  type ISignInRequestDTO,
} from 'domain/dtos/repositories/AuthRepositoryDTO';
import { type AuthRepository } from 'domain/repositories/AuthRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { env } from 'infra/env';

import { PrismaUserMapper } from '../mappers/PrismaUserMapper';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentials: ISignInRequestDTO): Promise<ISignInResponseDTO> {
    const userPrisma = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });

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

    const user = PrismaUserMapper.toDomain(userPrisma);

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      username: user.username,
      updated_at: user.updatedAt,
      created_at: user.createdAt,
      token: await this.jwtService.signAsync(payload, {
        secret: env.JWT_KEY,
        expiresIn: '2d',
      }),
    };
  }
}
