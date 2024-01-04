import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { type IOwnDriver } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';

import {
  NaturalPersonInput,
  NaturalPersonUpdate,
} from '../NaturalPersonGraphql/NaturalPerson.Input';

@InputType()
export class OwnDriverInput
  implements
    Omit<IOwnDriver, 'id' | 'created_at' | 'updated_at' | 'natural_person_id'>
{
  @Field()
  cnh: string;
  @Field()
  cnh_category: string;
  @Field(() => Date)
  cnh_expiration: Date;
  @Field()
  company_vehicle: boolean;
  @Field()
  course_mopp: boolean;
  @Field(() => NaturalPersonInput)
  NaturalPerson: NaturalPersonInput;
  @HideField()
  created_by: string;
  @HideField()
  updated_by: string;
  @HideField()
  natural_person_id: string;
}

@InputType()
export class OwnDriverUpdate extends PartialType(
  OmitType(OwnDriverInput, ['NaturalPerson']),
) {
  @Field(() => NaturalPersonUpdate)
  NaturalPersonUpdate: NaturalPersonUpdate;
}
