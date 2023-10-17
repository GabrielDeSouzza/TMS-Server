import {
  Field,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';

import { type IUser } from '../../../../domain/entities/user/User';
import { ROLE } from '../../../../domain/entities/user/User';

@InputType()
export class UserInput
  implements Omit<IUser, 'updated_at' | 'created_at' | 'id'>
{
  @Field()
  name: string;
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(() => ROLE)
  role: ROLE;
}

@InputType()
export class UserUpdateInput extends PartialType(UserInput) {}

registerEnumType(ROLE, { name: 'ROLE' });
