import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { hashSync } from 'bcrypt';

import { AuthRepository } from 'domain/repositories/AuthRepository';

import { AuthInput } from './auth.input';
import { AuthModel } from './auth.model';
import { type IJWTResolver } from './dto/payload-jwt-dto.ts';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private authRepository: AuthRepository) {}
  @Mutation(() => AuthModel)
  async login(@Args('loginData') userData: AuthInput) {
    console.log(hashSync('1234', 10));
    const response = await this.authRepository.signIn(userData);

    const resolver: IJWTResolver = {
      email: response.email,
      id: response.id,
      name: response.name,
      username: response.username,
      token: response.token,
    };

    return resolver;
  }
}
