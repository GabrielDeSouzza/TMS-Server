import { Field, Float, ObjectType } from '@nestjs/graphql';

import { type IFreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';

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
