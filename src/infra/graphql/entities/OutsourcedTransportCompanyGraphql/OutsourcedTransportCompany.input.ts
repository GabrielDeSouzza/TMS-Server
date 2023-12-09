import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { type IOutsourcedTransportCompany } from 'domain/entities/legalPerson/outsourcedTransportCompany/OutsourcedTransportCompany';

import {
  LegalPersonInput,
  type LegalPersonUpdateInput,
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
  LegalPerson?: LegalPersonInput;
  @Field({ nullable: true })
  legalPersonId?: string;
  @HideField()
  updated_by: string;
  @HideField()
  created_by: string;
}
@InputType()
export class OutsourcedTransportCompanyUpdateInput extends PartialType(
  OmitType(OutsourcedTransportCompanyInput, ['LegalPerson']),
) {
  LegalPeson: LegalPersonUpdateInput;
}
