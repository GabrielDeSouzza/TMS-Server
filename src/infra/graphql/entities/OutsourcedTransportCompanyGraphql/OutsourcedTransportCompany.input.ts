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
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import { type IOutsourcedTransportCompany } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompany/OutsourcedTransportCompany';

import {
  LegalPersonInput,
  LegalPersonUpdateInput,
} from '../LegalPersonGraphql/LegalPerson.input';

@InputType()
export class OutsourcedTransportCompanyInput
  implements
    Omit<
      IOutsourcedTransportCompany,
      'id' | 'created_at' | 'updated_at' | 'legalPersonId'
    >
{
  @Field(() => LegalPersonInput, { nullable: true })
  @Type(() => LegalPersonInput)
  @IsObject()
  @IsOptional()
  LegalPerson?: LegalPersonInput;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  legalPersonId?: string;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  created_by: string;
}
@InputType()
export class OutsourcedTransportCompanyUpdateInput extends PartialType(
  OmitType(OutsourcedTransportCompanyInput, [
    'LegalPerson',
    'created_by',
    'legalPersonId',
  ]),
) {
  @Field(() => LegalPersonUpdateInput)
  LegalPerson: LegalPersonUpdateInput;
  @HideField()
  updated_by: string;
}
