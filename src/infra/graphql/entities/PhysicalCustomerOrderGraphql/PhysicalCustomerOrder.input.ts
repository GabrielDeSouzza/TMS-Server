import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  Allow,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type IPhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

import { FreightExpenseUpdateOrderInput } from '../FreightExpenseGraphql/FreightExpense.input';

@InputType()
export class PhysicalCustomerOrderInput
  implements Omit<IPhysicalCustomerOrder, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  quote_table_id: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  carrier_id: string;
  @HideField()
  @Allow()
  order: string;
  @Field()
  @IsUUID()
  @IsNotEmpty()
  physicalCustomerId: string;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  @IsOptional()
  total_shipping_cost?: number;
  @HideField()
  @Allow()
  @IsOptional()
  total_receivable?: number;
  @HideField()
  @Allow()
  @IsOptional()
  total_tax_payable?: number;
  @Field(() => [FreightExpenseUpdateOrderInput], { nullable: true })
  @IsOptional()
  @Type(() => FreightExpenseUpdateOrderInput)
  expenses?: FreightExpenseUpdateOrderInput[];
}
@InputType()
export class PhysicalCustomerOrderUpdateInput extends PartialType(
  PhysicalCustomerOrderInput,
) {
  @Field(() => [FreightExpenseUpdateOrderInput], { nullable: true })
  @IsOptional()
  @Type(() => FreightExpenseUpdateOrderInput)
  expenses?: FreightExpenseUpdateOrderInput[];
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @Allow()
  deleted_expenses?: string[];
}
@InputType()
export class PhysicalCustomerOrderUpdateManyInput extends PartialType(
  PhysicalCustomerOrderInput,
) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
  @Field(() => [FreightExpenseUpdateOrderInput], { nullable: true })
  @IsOptional()
  @Type(() => FreightExpenseUpdateOrderInput)
  expenses?: FreightExpenseUpdateOrderInput[];
}
