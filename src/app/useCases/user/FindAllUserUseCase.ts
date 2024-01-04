import { Injectable } from '@nestjs/common';

import { type FindUserWhere } from 'domain/dto/repositories/UserRepositoryDto';
import { type User } from 'domain/entities/User/User';
import { UserRepository } from 'domain/repositories/UserRepository';

@Injectable()
export class FindAllUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(where: FindUserWhere): Promise<User[]> {
    return await this.userRepository.findAllUsers(where);
  }
}
