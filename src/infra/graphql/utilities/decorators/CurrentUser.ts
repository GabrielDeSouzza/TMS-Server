/* eslint-disable @typescript-eslint/naming-convention */
import { type ExecutionContext, createParamDecorator } from '@nestjs/common';

import { type Request } from 'express';

import { type User } from 'domain/entities/User/User';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): User => {
    const { req } = context.getArgByIndex<{ req: Request & { user: User } }>(2);

    const { user } = req;

    return user;
  },
);
