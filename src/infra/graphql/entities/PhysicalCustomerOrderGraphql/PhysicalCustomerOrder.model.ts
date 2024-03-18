import { Field, ObjectType } from '@nestjs/graphql';

import { type IPhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

import { PhysicalCustomerModel } from '../PhysicalCustomerGraphql/PhysicalCustomer.model';
import { PhysicalCustomerMerchandiseModel } from '../PhysicalCustomerMerchandiseGraphql/PhysicalCustomerMerchandise.model';
import { RecipientModel } from '../RecipientGraphql/Recipient.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class PhysicalCustomerOrderModel implements IPhysicalCustomerOrder {
  @Field()
  recipient_id: string;
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
  @Field(() => [PhysicalCustomerMerchandiseModel])
  Merchandises: [PhysicalCustomerMerchandiseModel];
  @Field(() => PhysicalCustomerModel)
  PhysicalCustomer: PhysicalCustomerModel;
  @Field(() => RecipientModel)
  Recipient: RecipientModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
  /* @Field(() => [InvoiceForLegalClientModel])
  Invoices = [InvoiceForLegalClientModel];*/
}
