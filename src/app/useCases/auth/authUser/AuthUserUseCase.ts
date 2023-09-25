import { Injectable } from '@nestjs/common';

import { AuthRepository } from 'domain/repositories/AuthRepository';

import {
  type IAuthUserUseCaseRequestDTO,
  type IAuthUserUseCaseResponseDTO,
} from 'app/dtos/auth/AuthUserUseCaseDTO';

@Injectable()
export class AuthUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(
    request: IAuthUserUseCaseRequestDTO,
  ): Promise<IAuthUserUseCaseResponseDTO> {
    const data = await this.authRepository.signIn({
      email: request.email,
      password: request.password,
    });

    return data;
  }
}
