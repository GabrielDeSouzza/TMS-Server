import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { GraphQLError } from 'graphql';

import {
  type ISignInRequestDTO,
  type ISignInResponseDTO,
} from 'domain/repositories/AuthDTO/AuthRepositoryDto';
import { type AuthRepository } from 'domain/repositories/AuthRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { UserPrismaDTO } from './prismaDTO/UserPrismaDto';

@Injectable()
export class AuthServicePrisma implements AuthRepository {
  constructor(
    private jwtService: JwtService,
    private userUseCase: UserUseCases,
  ) {}

  async signIn(credentials: ISignInRequestDTO): Promise<ISignInResponseDTO> {
    const userPrisma = await this.userUseCase.getUser({
      email: credentials.email,
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

    const user = UserPrismaDTO.PrismaToEntity({
      avatar_url: userPrisma.avatar_url,
      created_at: userPrisma.created_at,
      email: userPrisma.email,
      id: userPrisma.id,
      name: userPrisma.name,
      password: userPrisma.password,
      role: userPrisma.role,
      updated_at: userPrisma.updated_at,
      username: userPrisma.username,
    });

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
