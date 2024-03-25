import { Field, ObjectType } from '@nestjs/graphql';

import { type IPhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte';

@ObjectType()
export class PhysicalCustomerCteModel implements IPhysicalCustomerCte {
  @Field()
  cteType: string;
  @Field()
  id?: string;
  @Field()
  orderId: string;
  @Field()
  acessKey: string;
  @Field({ nullable: true })
  observations?: string;
  @Field()
  cteNumber: string;
}
