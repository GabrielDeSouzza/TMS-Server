import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthUserUseCase } from 'app/useCases/auth/authUser/AuthUserUseCase';

import { type AuthResponseDTO } from 'infra/http/dtos/auth/AuthResponseDTO';

import { AuthUserInput } from '../inputs/auth.input';
import { AuthUserModel } from '../models/auth.model';

@Resolver(() => AuthUserModel)
export class AuthResolver {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  @Mutation(() => AuthUserModel)
  async signIn(@Args('signin') user: AuthUserInput): Promise<AuthResponseDTO> {
    return await this.authUserUseCase.execute(user);
  }
}
