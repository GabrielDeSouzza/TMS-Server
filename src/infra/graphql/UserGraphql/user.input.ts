import { Field, InputType } from '@nestjs/graphql';

import { type IUser } from '../../../domain/entities/user/User';

@InputType()
export class UserInput implements IUser {
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
