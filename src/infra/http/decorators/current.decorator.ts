import { type ExecutionContext, createParamDecorator } from '@nestjs/common';

import { type Request } from 'express';

import { type User } from 'domain/entities/user/User';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const { req } = context.getArgByIndex<{ req: Request & { user: User } }>(2);

    const { user } = req;

    return user;
  },
);
