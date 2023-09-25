import { Field, ObjectType } from '@nestjs/graphql';

import { type AuthResponseDTO } from 'infra/http/dtos/auth/AuthResponseDTO';

@ObjectType()
export class AuthUserModel implements AuthResponseDTO {
  @Field({ description: 'Your Id' })
  id: string;

  @Field({ description: 'Your E-mail' })
  email: string;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  role: 'USER' | 'ADMIN' | 'CLIENT';

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field()
  token: string;
}
