import { Injectable } from '@nestjs/common';

import { type Role } from '@prisma/client';

import { User, type IUser } from '../../../../domain/entities/user/User';
import { type UserRepository } from '../../../../domain/repositories/UserRepository';
import { NotificationErrorsDatabase } from '../NotificationErrorsDatabase.ts';
import { PrismaService } from '../prisma.service';

@Injectable()

// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class UserService implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    const usersPrisma = await this.prisma.user.findMany();

    const users: User[] = usersPrisma.map(
      user =>
        new User(
          {
            email: user.email,
            name: user.name,
            role: user.role,
            username: user.username,
            password: user.password,
            created_at: user.created_at,
            updated_at: user.updated_at,
          },
          user.id,
        ),
    );

    return users;
  }

  async createUSer(user: IUser): Promise<User> {
    try {
      const newUSer = await this.prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          password: user.password,
          username: user.username,
          role: user.role as unknown as Role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          role: true,
          created_at: true,
          updated_at: true,
          password: true,
        },
      });
      const iser = new User(
        {
          email: newUSer.email,
          name: newUSer.name,
          role: user.role,
          username: newUSer.username,
          password: newUSer.password,
          created_at: newUSer.created_at,
          updated_at: newUSer.updated_at,
        },
        newUSer.id,
      );

      return iser;
    } catch (error) {
      new NotificationErrorsDatabase().HandleErrors(error);
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
      console.log(user.created_at);

      return new User(
        {
          email: user.email,
          name: user.name,
          password: user.password,
          role: user.role,
          username: user.username,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
        id,
      );
    } catch (error) {
      new NotificationErrorsDatabase().HandleErrors(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
      console.log(user.created_at);

      return new User(
        {
          email: user.email,
          name: user.name,
          password: user.password,
          role: user.role,
          username: user.username,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
        user.id,
      );
    } catch (error) {
      new NotificationErrorsDatabase().HandleErrors(error);
    }
  }
  async updateUser(user: IUser): Promise<User> {
    try {
      const newUSer = await this.prisma.user.update({
        data: {
          email: user.email,
          name: user.name,
          password: user.password,
          username: user.username,
          role: user.role as unknown as Role,
        },
        where: { username: user.username },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          role: true,
          created_at: true,
          updated_at: true,
          password: true,
        },
      });
      const iser = new User(
        {
          email: newUSer.email,
          name: newUSer.name,
          role: user.role,
          username: newUSer.username,
          password: newUSer.password,
          created_at: newUSer.created_at,
          updated_at: newUSer.updated_at,
        },
        newUSer.id,
      );
      console.log(user.created_at);

      return iser;
    } catch (error) {
      new NotificationErrorsDatabase().HandleErrors(error);
    }
  }
}
