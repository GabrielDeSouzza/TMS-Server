import { Injectable } from '@nestjs/common';

import { type getUserDto } from 'domain/dto/repositories/getDataDtos/GetUserDto';
import { type FindAllUserWhereRequestDTO } from 'domain/dto/repositories/whereDtos/UserRepositoryDto';

import { type User } from '../../../../domain/entities/User/User';
import { type UserRepository } from '../../../../domain/repositories/UserRepository';
import { NotificationErrorsDatabase } from '../NotificationErrorsDatabase.ts';
import { PrismaService } from '../prisma.service';
import { UserPrismaDTO } from './prismaDTO/UserPrismaDto';

@Injectable()
export class UserPrismaService implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async findUser(request: getUserDto): Promise<User> {
    return UserPrismaDTO.PrismaToEntity(
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
