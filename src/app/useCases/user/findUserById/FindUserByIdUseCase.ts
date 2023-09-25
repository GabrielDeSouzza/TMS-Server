import { Injectable } from '@nestjs/common';

import { type User } from 'domain/entities/user/User';
import { UserRepository } from 'domain/repositories/UserRepository';

import { type IFindUserByIdUseCaseRequestDTO } from 'app/dtos/user/FindUserByIdUseCaseDTO';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: IFindUserByIdUseCaseRequestDTO): Promise<User> {
    const user = await this.userRepository.findUserById(request.id);

    return user;
  }
}
