import { Field, InputType, PartialType } from '@nestjs/graphql';

import { type IUser } from '../../../../domain/entities/User/User';

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
  @Field()
  role: string;
}

@InputType()
export class UserUpdateInput extends PartialType(UserInput) {}
