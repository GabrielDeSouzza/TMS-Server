import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

import { type Request } from 'express';
import { GraphQLError } from 'graphql';

import { type User } from 'domain/entities/user/User';

@Injectable()
export class GraphQLAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(executionContext);

    const { req } = context.getArgByIndex<{ req: Request & { user: User } }>(2);

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new GraphQLError('Missing token!', {
        extensions: { code: HttpStatus.FORBIDDEN },
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync<User>(token, {
        secret: process.env.JWT_KEY,
      });

      req.user = payload;
    } catch (error) {
      console.log(error);

      throw new GraphQLError('Invalid token!', {
        extensions: { code: HttpStatus.UNAUTHORIZED },
      });
    }

    return super.canActivate(new ExecutionContextHost([req])) as boolean;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (!request?.headers?.authorization) {
      throw new GraphQLError('Missing token!', {
        extensions: { code: HttpStatus.FORBIDDEN },
      });
    }

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
