import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type User } from 'domain/entities/user/User';
import { type UserRepository } from 'domain/repositories/UserRepository';

import { PrismaUserMapper } from 'infra/database/prisma/mappers/PrismaUserMapper';
import { PrismaService } from 'infra/database/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const userEmailExist = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (userEmailExist) {
      throw new GraphQLError('E-mail already exists!', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    const userUsernameExist = await this.prisma.user.findUnique({
      where: { username: user.username },
    });

    if (userUsernameExist) {
      throw new GraphQLError('Username already exists!', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    const userPrisma = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });

    return PrismaUserMapper.toDomain(userPrisma);
  }

  async findAllUser(id: string): Promise<User[]> {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new GraphQLError('User does not exist!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const usersPrisma = await this.prisma.user.findMany();

    return usersPrisma.map(userPrisma => PrismaUserMapper.toDomain(userPrisma));
  }

  async findUserById(id: string): Promise<User> {
    const userPrisma = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userPrisma) {
      throw new GraphQLError('User not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return PrismaUserMapper.toDomain(userPrisma);
  }

  async findUserByEmail(email: string): Promise<User> {
    const userPrisma = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userPrisma) {
      throw new GraphQLError('User does not exist!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return PrismaUserMapper.toDomain(userPrisma);
  }
}
