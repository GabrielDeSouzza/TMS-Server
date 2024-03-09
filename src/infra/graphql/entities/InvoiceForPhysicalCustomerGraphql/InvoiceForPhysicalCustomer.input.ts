import {
  Field,
  Float,
  HideField,
  InputType,
  PartialType,
} from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Allow, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { type IInvoicePhysicalCustomer } from 'domain/entities/PhysicalClientEntities/invoiceForPhysicalCustomer/InvoiceForPhysicalCustomer';

@InputType()
export class InvoiceForPhysicalCustomerInput
  implements Omit<IInvoicePhysicalCustomer, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  physicalCustomerOrderId: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  carrierCompanyId: string;
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  emission_date: Date;
  @Allow()
  @HideField()
  invoice_number: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  nature_invoice: string;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  invoice_total: number;
  @Field()
  @IsString()
  @IsNotEmpty()
  form_payment: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  additional_data: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  digital_signature: string;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  invoice_taxes: number;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}
@InputType()
export class InvoiceForPhysicalCustomerUpdateInput extends PartialType(
  InvoiceForPhysicalCustomerInput,
) {
  updated_by: string;
}
