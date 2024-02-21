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
  IsOptional,
  IsString,
} from 'class-validator';

import { type IOutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';

import {
  NaturalPersonInput,
  NaturalPersonUpdate,
} from '../NaturalPersonGraphql/NaturalPerson.Input';

@InputType()
export class OutsourcedTransportCompanyDriverInput
  implements
    Omit<
      IOutsourcedTransportCompanyDriver,
      'id' | 'created_at' | 'updated_at' | 'natural_person_id'
    >
{
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  natural_person_id?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  cnh: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  cnh_category: string;
  @Field()
  @IsDate()
  @Type(() => Date)
  cnh_expiration: Date;
  @Field()
  @IsBoolean()
  course_mopp: boolean;
  @Field()
  @IsString()
  @IsNotEmpty()
  outsourced_transport_company_id: string;
  @HideField()
  @Allow()
  updated_by: string;
  @Field(() => NaturalPersonInput, { nullable: true })
  @IsOptional()
  @Type(() => NaturalPersonInput)
  NaturalPerson?: NaturalPersonInput;
  @HideField()
  @Allow()
  created_by: string;
}
@InputType()
export class OutsourcedTransportCompanyDriverUpdateInput extends PartialType(
  OmitType(OutsourcedTransportCompanyDriverInput, ['NaturalPerson']),
) {
  @Field(() => NaturalPersonUpdate, { nullable: true })
  NaturalPerson?: NaturalPersonUpdate;
  updated_by: string;
}
