import { Field, ObjectType } from '@nestjs/graphql';

import { type IUser } from '../../../domain/entities/user/User';

@ObjectType()
export class UserModel implements IUser {
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
  @Field({ nullable: true })
  created_at: Date;
  @Field({ nullable: true })
  updated_at: Date;
}
