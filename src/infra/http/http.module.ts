import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthUserUseCase } from 'app/useCases/auth/authUser/AuthUserUseCase';
import { CreateUserUseCase } from 'app/useCases/user/createUser/CreateUserUseCase';
import { FindAllUsersUseCase } from 'app/useCases/user/findAllUsers/FindAllUsersUseCase';
import { FindUserByIdUseCase } from 'app/useCases/user/findUserById/FindUserByIdUseCase';

import { DatabaseModule } from 'infra/database/database.module';
import { UserResolver } from 'infra/http/graphql/resolvers/user.resolver';

import { AuthResolver } from './graphql/resolvers/auth.resolver';
import { JwtStrategy } from './guard/strategies/jwt.strategy';

@Module({
  imports: [DatabaseModule],
  providers: [
    JwtService,
    JwtStrategy,
    AuthResolver,
    UserResolver,
    AuthUserUseCase,
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
  ],
})
export class HttpModule {}
