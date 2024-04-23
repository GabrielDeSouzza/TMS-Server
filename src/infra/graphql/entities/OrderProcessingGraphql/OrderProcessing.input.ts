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
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type IOrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';

import { statusOrderEmum } from './OrderStatusEnum.enum';

@InputType()
export class OrderProcessingInput
  implements Omit<IOrderProcessing, 'id' | 'created_at' | 'updated_at'>
{
  @HideField()
  @Allow()
  order_processing_number: string;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  total_distance: number;
  @Field(() => statusOrderEmum)
  @IsString()
  @IsNotEmpty()
  status: statusOrderEmum;
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
  vehicle_id: string;
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  physical_customer_order_ids?: string[];
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  legal_customer_order_ids?: string[];

  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}

@InputType()
export class OrderProcessingUpdateInput extends PartialType(
  OrderProcessingInput,
) {
  @HideField()
  @Allow()
  updated_by: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  disconnect_legal_client_order: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  disconnect_physical_customer_order?: string;
}
