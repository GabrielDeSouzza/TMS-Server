import { type User as RawUser } from '@prisma/client';

import { User } from 'domain/entities/user/User';

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      username: user.username,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }

  static toDomain(raw: RawUser): User {
    const user = new User(
      {
        name: raw.name,
        role: raw.role,
        username: raw.username,
        email: raw.email,
        password: raw.password,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );

    return user;
  }
}
