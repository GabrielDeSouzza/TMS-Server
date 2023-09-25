import { Field, ObjectType } from '@nestjs/graphql';

import { type UserResponseDTO } from 'infra/http/dtos/user/UserResponseDTO';

@ObjectType()
export class UserModel implements UserResponseDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  role: 'USER' | 'ADMIN' | 'CLIENT';

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
