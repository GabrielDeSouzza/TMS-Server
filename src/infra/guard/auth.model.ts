import { Field, ObjectType } from '@nestjs/graphql';

import { type IJWTResolver } from './dto/payload-jwt-dto.ts';

@ObjectType()
export class AuthModel implements IJWTResolver {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  name: string;
  @Field()
  token: string;
}
