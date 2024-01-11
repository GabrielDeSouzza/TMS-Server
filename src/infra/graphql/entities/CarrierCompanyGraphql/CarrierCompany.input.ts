import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { Allow, IsObject, IsOptional, IsUUID } from 'class-validator';

import { type ICarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';

import {
  LegalPersonInput,
  LegalPersonUpdateInput,
} from '../LegalPersonGraphql/LegalPerson.input';

@InputType()
export class CarrierCompanyInput
  implements
    Omit<ICarrierCompany, 'id' | 'created_at' | 'updated_at' | 'legalPersonId'>
{
  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  legalPersonId?: string;
  @Allow()
  @HideField()
  updated_by: string;
  @Allow()
  @HideField()
  created_by: string;
  @IsObject()
  @IsOptional()
  @Field(() => LegalPersonInput, { nullable: true })
  LegalPerson?: LegalPersonInput;
}
@InputType()
export class CarrierCompanyUpdateInput extends PartialType(
  OmitType(CarrierCompanyInput, ['LegalPerson', 'LegalPerson']),
) {
  @Field(() => LegalPersonUpdateInput)
  LegalPerson: LegalPersonUpdateInput;
}
