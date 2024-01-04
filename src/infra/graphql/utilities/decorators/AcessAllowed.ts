/* eslint-disable @typescript-eslint/naming-convention */
import { SetMetadata } from '@nestjs/common';

import { type ROLE } from 'domain/entities/User/User';

export const AcessAllowed = (...roles: ROLE[]) => SetMetadata('roles', roles);
