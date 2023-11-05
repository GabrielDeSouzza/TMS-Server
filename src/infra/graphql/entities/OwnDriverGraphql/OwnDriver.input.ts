import { UseInterceptors } from '@nestjs/common';
import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';

import { type IOwnDriver } from 'domain/entities/driverEntities/ownDriver/OwnDriver';
import { CNH } from 'domain/entities/driverEntities/ownDriver/OwnDriver';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';

import {
  NaturalPersonInput,
  NaturalPersonUpdate,
} from '../NaturalPersonGraphql/NaturalPerson.Input';

@UseInterceptors(RoleInterceptor)
@AcessAllowed('ADMIN')
@InputType()
export class OwnDriverInput
  implements
    Omit<IOwnDriver, 'id' | 'created_at' | 'updated_at' | 'natural_person_id'>
{
  @Field()
  cnh: string;
  @Field()
  cnh_category: CNH;
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
registerEnumType(CNH, { name: 'ROLEdfd' });
