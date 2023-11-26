import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { type ILegalClient } from 'domain/entities/legalClientEntities/LegalClient/LegalClient';

import {
  LegalPersonUpdateInput,
  LegalPersonInput,
} from '../LegalPersonGraphql/LegalPerson.input';

@InputType()
export class LegalClientInput
  implements Omit<ILegalClient, 'id' | 'created_at' | 'updated_at'>
{
  legal_person_id: string;
  @Field()
  branch: string;
  @Field(() => LegalPersonInput)
  LegalPerson: LegalPersonInput;
  @HideField()
  updated_by: string;
  @HideField()
  created_by?: string;
}
@InputType()
export class LegalClientUpdateInput extends PartialType(
  OmitType(LegalClientInput, ['LegalPerson']),
) {
  @Field(() => LegalPersonUpdateInput)
  LegalPerson: LegalPersonUpdateInput;
}
