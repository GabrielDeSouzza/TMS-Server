import { Injectable } from '@nestjs/common';

import { type User, type IUser } from '../../../../domain/entities/user/User';
import { type UserRepository } from '../../../../domain/repositories/UserRepository';
import { NotificationErrorsDatabase } from '../NotificationErrorsDatabase.ts';
import { PrismaService } from '../prisma.service';
import { UserPrismaDTO } from './prismaDTO/UserPrismaDto';

@Injectable()

// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class UserService implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    const usersPrisma = await this.prisma.user.findMany();

    const users: User[] = usersPrisma.map(user =>
      UserPrismaDTO.PrismaToEntity(user),
    );
    console.log(users);

    return users;
  }

  async createUSer(user: IUser): Promise<User> {
    try {
      console.log(user);
      const newUSer = await this.prisma.user.create({
        data: UserPrismaDTO.EntityToPrisma(user),
      });
      console.log(newUSer);

      return UserPrismaDTO.PrismaToEntity(newUSer);
    } catch (error) {
      new NotificationErrorsDatabase().HandleErrors(error);
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
      console.log(typeof user);

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
  async updateUser(id: string, user: IUser): Promise<User> {
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
