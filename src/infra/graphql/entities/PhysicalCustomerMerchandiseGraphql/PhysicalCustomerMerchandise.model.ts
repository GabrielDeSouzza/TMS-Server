import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { type IPhysicalCustomerMerchandise } from 'domain/entities/PhysicalClientEntities/physicalCustomerMerchandise/physical-merchandise';

import { InvoiceForPhysicalCustomerModel } from '../InvoiceForPhysicalCustomerGraphql/InvoiceForPhysicalCustomer.model';
import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';

@ObjectType()
export class PhysicalCustomerMerchandiseModel
  implements IPhysicalCustomerMerchandise
{
  @Field()
  invoicePhysicalClient: string;
  @Field()
  id: string;
  @Field()
  codMerchandise: string;
  @Field(() => Int)
  amount: number;
  @Field()
  description: string;
  @Field(() => Float)
  mass: number;
  @Field(() => Float)
  volume: number;
  @Field(() => Float)
  value: number;
  @Field()
  physicalCustomerOrderId: string;
  @Field(() => LegalClientOrderModel)
  LegalClientOrder: LegalClientOrderModel;
  @Field(() => InvoiceForPhysicalCustomerModel)
  Invoice: InvoiceForPhysicalCustomerModel;
}
