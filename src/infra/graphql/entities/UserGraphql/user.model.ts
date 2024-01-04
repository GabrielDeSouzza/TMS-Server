import { Field, ObjectType, OmitType, registerEnumType } from '@nestjs/graphql';

import { ROLE, type IUser } from '../../../../domain/entities/User/User';

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
  @Field()
  role: string;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}

@ObjectType()
export class UserModelRefereces extends OmitType(UserModel, [
  'password',
  'role',
  'updated_at',
  'created_at',
] as const) {}

registerEnumType(ROLE, { name: 'ROLE' });
