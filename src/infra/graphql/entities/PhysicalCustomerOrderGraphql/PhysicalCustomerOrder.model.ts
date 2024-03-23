import { Field, ObjectType } from '@nestjs/graphql';

import { type IPhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

import { PhysicalCustomerModel } from '../PhysicalCustomerGraphql/PhysicalCustomer.model';
import { PhysicalCustomerQuoteTableModel } from '../PhysicalCustomerQuoteTableGraphql/PhysicalCustomerQuoteTable.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class PhysicalCustomerOrderModel implements IPhysicalCustomerOrder {
  @Field()
  quote_table_id: string;
  @Field()
  id?: string;
  @Field()
  order: string;
  @Field()
  physicalCustomerId: string;
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
  @Field(() => PhysicalCustomerQuoteTableModel)
  Quote: PhysicalCustomerQuoteTableModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
  /* @Field(() => [InvoiceForLegalClientModel])
  Invoices = [InvoiceForLegalClientModel];*/
}
