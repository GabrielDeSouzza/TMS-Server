import { Field, Float, InputType, PartialType } from '@nestjs/graphql';

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type IFreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';

@InputType()
export class FreightExpenseInput
  implements Omit<IFreightExpense, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  expenseName: string;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  value: number;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  physicalCustomerOrderId?: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  legalClientOrderId?: string;
}

@InputType()
export class FreightExpenseUpdateInput extends PartialType(
  FreightExpenseInput,
) {}

@InputType()
export class FreightExpenseUpdateManyInput extends PartialType(
  FreightExpenseInput,
) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
