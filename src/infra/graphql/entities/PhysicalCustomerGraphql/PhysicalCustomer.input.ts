import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { IsNotEmpty, IsUUID } from 'class-validator';

import { type IPhysicalCustomer } from 'domain/entities/PhysicalClientEntities/physicalCustomer/PhysicalCustomer';

import {
  NaturalPersonInput,
  NaturalPersonUpdate,
} from '../NaturalPersonGraphql/NaturalPerson.Input';

@InputType()
export class PhysicalCustomerInput
  implements
    Omit<
      IPhysicalCustomer,
      'id' | 'created_at' | 'updated_at' | 'natural_person_id'
    >
{
  @Field({ nullable: true })
  branch?: string;
  @Field({ nullable: true })
  natural_person_id?: string;
  @HideField()
  created_by?: string;
  @HideField()
  updated_by: string;
  @Field(() => NaturalPersonInput, { nullable: true })
  NaturalPerson?: NaturalPersonInput;
}

@InputType()
export class PhysicalCustomerUpdateInput extends PartialType(
  OmitType(PhysicalCustomerInput, ['NaturalPerson']),
) {
  @Field(() => NaturalPersonUpdate, { nullable: true })
  NaturalPerson?: NaturalPersonUpdate;
  updated_by: string;
}

@InputType()
export class PhysicalCustomerUpdateManyInput extends PartialType(
  PhysicalCustomerInput,
) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
