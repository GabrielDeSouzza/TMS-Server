import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  Allow,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  cnh: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  cnh_category: string;
  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  cnh_expiration: Date;
  @Field()
  @IsBoolean()
  company_vehicle: boolean;
  @Field()
  @IsBoolean()
  course_mopp: boolean;
  @Field(() => NaturalPersonInput)
  @Type(() => NaturalPersonInput)
  @IsObject()
  NaturalPerson: NaturalPersonInput;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  natural_person_id: string;
}

@InputType()
export class OwnDriverUpdate extends PartialType(
  OmitType(OwnDriverInput, ['NaturalPerson']),
) {
  @Field(() => NaturalPersonUpdate)
  NaturalPersonUpdate: NaturalPersonUpdate;
}
