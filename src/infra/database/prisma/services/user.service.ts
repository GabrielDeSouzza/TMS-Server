import { Injectable } from '@nestjs/common';

import { type FindUserWhere } from 'domain/dto/repositories/whereDtos/UserRepositoryDto';

import { type User } from '../../../../domain/entities/User/User';
import { type UserRepository } from '../../../../domain/repositories/UserRepository';
import { NotificationErrorsDatabase } from '../NotificationErrorsDatabase.ts';
import { PrismaService } from '../prisma.service';
import { UserPrismaDTO } from './prismaDTO/UserPrismaDto';

@Injectable()
export class UserPrismaService implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(parameters: FindUserWhere): Promise<User[]> {
    const usersPrisma = await this.prisma.user.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    const users: User[] = usersPrisma.map(user =>
      UserPrismaDTO.PrismaToEntity(user),
    );

    return users;
  }

  async createUSer(user: User): Promise<User> {
    try {
      const newUSer = await this.prisma.user.create({
        data: UserPrismaDTO.EntityToPrisma(user),
      });

      return UserPrismaDTO.PrismaToEntity(newUSer);
    } catch (error) {
      new NotificationErrorsDatabase().HandleErrors(error);
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });

      return UserPrismaDTO.PrismaToEntity(user);
    } catch (error) {
      new NotificationErrorsDatabase().HandleErrors(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });

      return UserPrismaDTO.PrismaToEntity(user);
    } catch (error) {
      new NotificationErrorsDatabase().HandleErrors(error);
    }
  }
  async updateUser(id: string, user: User): Promise<User> {
    try {
      const userPrisma = UserPrismaDTO.EntityToPrismaUpdate(user);
      const newUSer = await this.prisma.user.update({
        data: userPrisma,
        where: { id },
      });

      return UserPrismaDTO.PrismaToEntity(newUSer);
    } catch (error) {
      new NotificationErrorsDatabase().HandleErrors(error);
    }
  }
}
