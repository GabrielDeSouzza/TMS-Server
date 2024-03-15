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
export class OrderProcessingPhysicalCustomerUpdateInput extends PartialType(
  OrderProcessingPhysicalCustomerInput,
) {
  updated_by: string;
}
