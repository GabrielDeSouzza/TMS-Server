import { type User } from 'domain/entities/user/User';

import { type UserResponseDTO } from 'infra/http/dtos/user/UserResponseDTO';

export class UserViewModel {
  static toHTTP(user: User): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      role: user.role,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }
}
