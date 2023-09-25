import { Field, InputType } from '@nestjs/graphql';

import { IsEmail, IsString, MinLength } from 'class-validator';

import { type AuthRequestDTO } from 'infra/http/dtos/auth/AuthRequestDTO';

@InputType()
export class AuthUserInput implements AuthRequestDTO {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(8)
  password: string;
}
