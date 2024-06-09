import { Field, Float, ObjectType } from '@nestjs/graphql';

import { type IFreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { PhysicalCustomerOrderModel } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.model';

@ObjectType()
export class FreightExpenseModel implements IFreightExpense {
  @Field()
  id?: string;
  @Field()
  expenseName: string;
  @Field(() => Float)
  value: number;
  @Field({ nullable: true })
  physicalCustomerOrderId?: string;
  @Field({ nullable: true })
  legalClientOrderId?: string;
  @Field(() => LegalClientOrderModel)
  LegalClientOrder: LegalClientOrderModel;
  @Field(() => PhysicalCustomerOrderModel)
  PhysicalCustomerOrder: PhysicalCustomerOrderModel;
}

@ObjectType()
export class FreightExpenseOrderModel implements IFreightExpense {
  @Field({ nullable: true })
  id?: string;
  @Field()
  expenseName: string;
  @Field(() => Float)
  value: number;
}
