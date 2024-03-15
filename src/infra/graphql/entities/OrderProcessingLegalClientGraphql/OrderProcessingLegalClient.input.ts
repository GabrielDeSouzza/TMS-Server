import {
  Field,
  Float,
  HideField,
  InputType,
  PartialType,
} from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  Allow,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
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
  @Field(() => Date, { nullable: true })
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
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}

@InputType()
export class OrderProcessingLegalClientUpdateInput extends PartialType(
  OrderProcessingLegalClientInput,
) {
  updated_by: string;
}
