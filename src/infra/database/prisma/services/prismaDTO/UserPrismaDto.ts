import { type Prisma, Role, type User as UserPrisma } from '@prisma/client';

import { type IUser, ROLE, User } from 'domain/entities/user/User';

export class UserPrismaDTO {
  public static PrismaToEntity(userPrisma: UserPrisma) {
    return new User({
      email: userPrisma.email,
      name: userPrisma.name,
      password: userPrisma.password,
      role: ROLE[userPrisma.role],
      username: userPrisma.username,
      created_at: userPrisma.created_at,
      id: userPrisma.id,
      updated_at: userPrisma.updated_at,
    });
  }
  public static EntityToPrisma(userEntity: IUser) {
    const userPrisma: UserPrisma = {
      created_at: userEntity.created_at,
      email: userEntity.email,
      id: userEntity.id,
      name: userEntity.name,
      password: userEntity.password,
      role: Role[userEntity.role],
      updated_at: userEntity.updated_at,
      username: userEntity.username,
    };

    return userPrisma;
  }

  public static EntityToPrismaUpdate(user: IUser) {
    const userUptade: Prisma.UserUpdateInput = {
      created_at: user.created_at,
      email: user.email,
      id: user.id,
      name: user.name,
      role: Role[user.role],
      updated_at: user.updated_at,
      password: user.password,
      username: user.username,
    };

    return userUptade;
  }
}