import { Field, InputType, PartialType } from '@nestjs/graphql';

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { type IUser } from '../../../../domain/entities/User/User';

@InputType()
export class UserInput
  implements Omit<IUser, 'updated_at' | 'created_at' | 'id'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  email: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  role: string;
}

@InputType()
export class UserUpdateInput extends PartialType(UserInput) {}

@InputType()
export class UserUpdateManyInput extends PartialType(UserInput) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
