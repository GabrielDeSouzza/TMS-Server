import { Field, InputType, registerEnumType } from '@nestjs/graphql';

import { ROLE, type IUser } from '../../../domain/entities/user/User';

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
  @Field(() => ROLE)
  role: ROLE;
}

registerEnumType(ROLE, { name: 'ROLE' });
