import { Field, Float, InputType, PartialType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type IOrderProcessingLegalClient } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingLegalClient/OrderProcessingLegalClient';

@InputType()
export class OrderProcessingLegalClientInput
  implements
    Omit<IOrderProcessingLegalClient, 'id' | 'created_at' | 'updated_at'>
{
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  total_distance: number;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  total_spend_liters: number;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  total_spending_money: number;
  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  start_at: Date;
  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  end_at?: Date;
  @Field()
  @IsString()
  @IsNotEmpty()
  order_id: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  vehicle_id: string;
  @Field()
  @IsUUID()
  @IsNotEmpty()
  created_by: string;
  @Field()
  @IsUUID()
  @IsNotEmpty()
  updated_by: string;
}

@InputType()
export class OrderProcessingLegalClientUpdateInput extends PartialType(
  OrderProcessingLegalClientInput,
) {
  updated_by: string;
}
