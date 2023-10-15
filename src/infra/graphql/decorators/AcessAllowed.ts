/* eslint-disable @typescript-eslint/naming-convention */
import { SetMetadata } from '@nestjs/common';

export const AcessAllowed = (...roles: string[]) => SetMetadata('roles', roles);
