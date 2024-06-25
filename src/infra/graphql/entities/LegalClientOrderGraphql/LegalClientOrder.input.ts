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
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type ILegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

import {
  FreightExpenseOrderInput,
  FreightExpenseUpdateOrderInput,
} from '../FreightExpenseGraphql/FreightExpense.input';

@InputType()
export class LegalClientOrderInput
  implements Omit<ILegalClientOrder, 'id' | 'created_at' | 'updated_at'>
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
  legal_contract_id: string;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  total_shipping_cost?: number;
  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  total_receivable?: number;
  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  total_tax_payable?: number;
  @Field(() => [FreightExpenseOrderInput])
  @IsOptional()
  @Type(() => FreightExpenseOrderInput)
  expenses?: FreightExpenseOrderInput[];
}
@InputType()
export class LegalClientOrderUpdateInput extends PartialType(
  LegalClientOrderInput,
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
export class LegalClientOrderUpdateManyInput extends PartialType(
  LegalClientOrderInput,
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
