import { Field, InputType, PartialType } from '@nestjs/graphql';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { type IRouteLegalClient } from 'domain/entities/OrdersAndRoutesEntities/routeLegalClient/RouteLegalClient';

@InputType()
export class RouteLegalClientInput
  implements Omit<IRouteLegalClient, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  cep: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  public_place: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  address_number: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  complement?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  legalClientOrderId: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  uf: string;
}

@InputType()
export class RouteLegalClientUpdateInput extends PartialType(
  RouteLegalClientInput,
) {}
