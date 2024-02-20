import { Field, ObjectType } from '@nestjs/graphql';

import { type IPhysicalCustomer } from 'domain/entities/PhysicalClientEntities/physicalCustomer/PhysicalCustomer';

import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';

@ObjectType()
export class PhysicalCustomerModel implements IPhysicalCustomer {
  @Field()
  id: string;
  @Field({ nullable: true })
  branch?: string;
  @Field()
  natural_person_id: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => NaturalPersonModel)
  NaturalPerson: NaturalPersonModel;
}
