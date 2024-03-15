import { Field, Float, ObjectType } from '@nestjs/graphql';

import { type IInvoicePhysicalCustomer } from 'domain/entities/PhysicalClientEntities/invoiceForPhysicalCustomer/InvoiceForPhysicalCustomer';

import { PhysicalCustomerModel } from '../PhysicalCustomerGraphql/PhysicalCustomer.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class InvoiceForPhysicalCustomerModel
  implements IInvoicePhysicalCustomer
{
  @Field()
  physicalCustomerId: string;
  @Field()
  invoice_number: string;
  @Field()
  id: string;
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
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => PhysicalCustomerModel)
  PhysicalCustomer: PhysicalCustomerModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
