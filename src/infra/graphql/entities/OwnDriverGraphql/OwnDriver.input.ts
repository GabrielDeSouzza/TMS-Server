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
  IsOptional,
  IsString,
  IsUUID,
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
  @Field(() => NaturalPersonInput, { nullable: true })
  @Type(() => NaturalPersonInput)
  @IsObject()
  @IsOptional()
  NaturalPerson: NaturalPersonInput;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  natural_person_id?: string;
}

@InputType()
export class OwnDriverUpdate extends PartialType(
  OmitType(OwnDriverInput, [
    'NaturalPerson',
    'natural_person_id',
    'created_by',
  ]),
) {
  @Field(() => NaturalPersonUpdate, { nullable: true })
  NaturalPerson?: NaturalPersonUpdate;
}

@InputType()
export class OwnDriverUpdateManyInput extends PartialType(OwnDriverInput) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
