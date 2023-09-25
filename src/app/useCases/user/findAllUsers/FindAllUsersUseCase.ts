import { Injectable } from '@nestjs/common';

import { type User } from 'domain/entities/user/User';
import { UserRepository } from 'domain/repositories/UserRepository';

import { type IFindAllUsersUseCaseRequestDTO } from 'app/dtos/user/FindAllUsersUseCaseDTO';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: IFindAllUsersUseCaseRequestDTO): Promise<User[]> {
    const users = await this.userRepository.findAllUser(request.id);

    return users;
  }
}
