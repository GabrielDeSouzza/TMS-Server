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

import { type IOrderProcessingPhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingPhysicalCustomer/OrderProcessingPhysicalCustomer';

@InputType()
export class OrderProcessingPhysicalCustomerInput
  implements
    Omit<IOrderProcessingPhysicalCustomer, 'id' | 'created_at' | 'updated_at'>
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
export class OrderProcessingPhysicalCustomerUpdateInput extends PartialType(
  OrderProcessingPhysicalCustomerInput,
) {
  updated_by: string;
}
