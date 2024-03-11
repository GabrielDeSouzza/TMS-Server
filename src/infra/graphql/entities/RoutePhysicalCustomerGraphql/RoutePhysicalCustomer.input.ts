import { Field, InputType, PartialType } from '@nestjs/graphql';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { type IRoutePhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/routePhysicalCustomer/RoutePhysicalCustomer';

@InputType()
export class RoutePhysicalCustomerInput
  implements Omit<IRoutePhysicalCustomer, 'id' | 'created_at' | 'updated_at'>
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
  order_processing_id: string;
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
export class RoutePhysicalCustomerUpdateInput extends PartialType(
  RoutePhysicalCustomerInput,
) {}
