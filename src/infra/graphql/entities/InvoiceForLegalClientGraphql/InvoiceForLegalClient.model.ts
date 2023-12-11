import { Field, Float, ObjectType } from '@nestjs/graphql';

import { type IInvoiceForLegalClient } from 'domain/entities/LegalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class InvoiceForLegalClientModel implements IInvoiceForLegalClient {
  @Field()
  id: string;
  @Field(() => Float)
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
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => LegalClientOrderModel)
  LegalClientOrder: LegalClientOrderModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
