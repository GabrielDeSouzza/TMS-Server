import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { type ICiotForLegalClient } from 'domain/entities/legalClientEntities/CiotForLegalPerson/CiotForLegalClient';

@InputType()
export class CiotForLegalClientInput
  implements Omit<ICiotForLegalClient, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  ciot: string;
  @Field(() => Date)
  emission_date: Date;
  @Field()
  legal_contract_id: string;
  @HideField()
  updated_by: string;
  @HideField()
  created_by?: string;
}
@InputType()
export class CiotForLegalClientUpdateInput extends PartialType(
  CiotForLegalClientInput,
) {}
