import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

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
  @Field({ nullable: true })
  legalPersonId?: string;
  @HideField()
  updated_by: string;
  @HideField()
  created_by: string;
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
