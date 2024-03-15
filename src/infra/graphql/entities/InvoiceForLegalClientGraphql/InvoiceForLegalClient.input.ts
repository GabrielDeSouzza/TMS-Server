import {
  Field,
  Float,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Allow, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { type IInvoiceForLegalClient } from 'domain/entities/LegalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';

@InputType()
export class InvoiceForLegalClientInput
  implements Omit<IInvoiceForLegalClient, 'id' | 'created_at' | 'updated_at'>
{
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
export class InvoiceForLegalClientUpdateInput extends PartialType(
  OmitType(InvoiceForLegalClientInput, [
    'created_by',
    'invoice_number',
    'digital_signature',
  ]),
) {
  updated_by: string;
}
