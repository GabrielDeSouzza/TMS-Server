import {
  Field,
  Float,
  HideField,
  InputType,
  PartialType,
} from '@nestjs/graphql';

import { type IInvoiceForLegalClient } from 'domain/entities/legalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';

@InputType()
export class InvoiceForLegalClientInput
  implements Omit<IInvoiceForLegalClient, 'id' | 'created_at' | 'updated_at'>
{
  @Field(() => Date)
  emission_date: Date;
  @Field()
  nature_invoice: string;
  @Field(() => Float)
  invoice_total: number;

  @Field()
  form_payment: string;
  @Field()
  additional_data: string;
  @Field()
  digital_signature: string;
  @Field(() => Float)
  invoice_taxes: number;
  @Field()
  legal_client_order_id: string;

  @HideField()
  created_by: string;
  @HideField()
  updated_by: string;
}
@InputType()
export class InvoiceForLegalClientUpdateInput extends PartialType(
  InvoiceForLegalClientInput,
) {}
