import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { GraphQLError } from 'graphql';

import { type User } from 'domain/entities/User/User';

import {} from 'rxjs';
@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(private reflactor: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    const { req } = context.getArgByIndex<{ req: Request & { user: User } }>(2);

    const { user } = req;
    const roleAllowed = this.reflactor.getAllAndMerge('roles', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!roleAllowed.includes(user.role) && user.role !== 'ADMIN') {
      throw new GraphQLError('Acess restrict', {
        extensions: { code: HttpStatus.UNAUTHORIZED },
      });
    }

    return next.handle();
  }
}
