import { Field, InputType, registerEnumType } from '@nestjs/graphql';

import { IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';

import { type UserRequestDTO } from 'infra/http/dtos/user/UserRequestDTO';

enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

registerEnumType(ROLE, {
  name: 'ROLE',
});

@InputType()
export class CreateUserInput implements UserRequestDTO {
  @Field()
  @MaxLength(80)
  name: string;

  @Field()
  @MaxLength(80)
  username: string;

  @Field()
  @IsEmail()
  @MaxLength(80)
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field(() => ROLE)
  @IsEnum(ROLE)
  role: 'USER' | 'ADMIN' | 'CLIENT';
}
