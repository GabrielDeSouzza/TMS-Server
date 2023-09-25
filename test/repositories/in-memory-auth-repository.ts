import { randomUUID } from 'node:crypto';

import {
  type ISignInRequestDTO,
  type ISignInResponseDTO,
} from 'domain/dtos/repositories/AuthRepositoryDTO';
import { type User } from 'domain/entities/user/User';
import { type AuthRepository } from 'domain/repositories/AuthRepository';

import { type InMemoryUserRepository } from './in-memory-user-repository';

export class InMemoryAuthRepository implements AuthRepository {
  constructor(private inMemoryUserRepository: InMemoryUserRepository) {}

  async signIn(credentials: ISignInRequestDTO): Promise<ISignInResponseDTO> {
    let user: User;

    try {
      user = await this.inMemoryUserRepository.findUserByEmail(
        credentials.email,
      );
    } catch {
      throw new Error('E-mail not found!');
    }

    if (credentials.password !== user.password) {
      throw new Error('Password incorrect!');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      role: user.role,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      token: randomUUID(),
    };
  }
}
