import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type getUserDto } from 'domain/dto/repositories/getDataDtos/GetUserDto';
import {
  type CountAllUserWhereRequestDTO,
  type UpdateManyUsersDTO,
  type FindAllUserWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/UserRepositoryDto';

import { type User } from '../../../../domain/entities/User/User';
import { type UserRepository } from '../../../../domain/repositories/UserRepository';
import { NotificationErrorsDatabase } from '../NotificationErrorsDatabase.ts';
import { PrismaService } from '../prisma.service';
import { UserPrismaDTO } from './prismaDTO/UserPrismaDto';

@Injectable()
export class UserPrismaService implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async count(parameters: CountAllUserWhereRequestDTO): Promise<number> {
    const count = this.prisma.user.count({ where: parameters.where });

    return count;
  }

  async deleteManyUsers(ids: string[]): Promise<User[]> {
    const users: User[] = [];

    await Promise.all(
      ids.map(async id => {
        const user = await this.prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new GraphQLError('User not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const userPrisma = await tx.user.delete({
            where: { id },
          });

          if (!userPrisma) {
            throw new GraphQLError('User not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const userDomain = UserPrismaDTO.PrismaToEntity(userPrisma);

          users.push(userDomain);
        });
      }),
    );

    return users;
  }

  async updateManyUsers(user: UpdateManyUsersDTO[]): Promise<User[]> {
    const users: User[] = [];

    await Promise.all(
      user.map(async item => {
        const user = await this.prisma.user.findUnique({
          where: { id: item.id },
        });

        if (!user) {
          throw new GraphQLError(`User with id "${item.id}" not found!`, {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const userPrisma = await tx.user.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!userPrisma) {
            throw new GraphQLError(`User with id "${item.id}" not updated!`, {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const userDomain = UserPrismaDTO.PrismaToEntity(userPrisma);

          users.push(userDomain);
        });
      }),
    );

    return users;
  }

  async findUser(request: getUserDto): Promise<User> {
    const user = UserPrismaDTO.PrismaToEntity(
      await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: request.email },
            { username: request.username },
            { id: request.id },
          ],
        },
      }),
    );

    return user;
  }

  async findAllUsers(parameters: FindAllUserWhereRequestDTO): Promise<User[]> {
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

  async createUser(user: User): Promise<User> {
    const newUSer = await this.prisma.user.create({
      data: UserPrismaDTO.EntityToPrisma(user),
    });

    return UserPrismaDTO.PrismaToEntity(newUSer);
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
