import { Injectable } from '@nestjs/common';

import { hash } from 'bcrypt';

import { User } from 'domain/entities/user/User';
import { UserRepository } from 'domain/repositories/UserRepository';

import { type ICreateUserUseCaseRequestDTO } from 'app/dtos/user/CreateUserUseCaseDTO';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: ICreateUserUseCaseRequestDTO): Promise<User> {
    const passwordHash = await hash(request.password, 10);

    const createUser = new User({
      email: request.email,
      password: passwordHash,
      name: request.name,
      role: request.role,
      username: request.username,
    });

    const user = await this.userRepository.create(createUser);

    return user;
  }
}
