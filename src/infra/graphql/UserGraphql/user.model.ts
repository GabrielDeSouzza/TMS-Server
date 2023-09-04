import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { ROLE, type IUser } from '../../../domain/entities/user/User';

@ObjectType()
export class UserModel implements IUser {
  @Field()
  id: string;
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
  @Field({ nullable: true })
  created_at: Date;
  @Field({ nullable: true })
  updated_at: Date;
}

registerEnumType(ROLE, { name: 'ROLE' });
