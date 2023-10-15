import { Field, InputType } from '@nestjs/graphql';

import { type ISignInRequestDTO } from 'domain/repositories/AuthDTO/AuthRepositoryDto';

@InputType()
export class AuthInput implements ISignInRequestDTO {
  @Field()
  email: string;
  @Field()
  password: string;
}
