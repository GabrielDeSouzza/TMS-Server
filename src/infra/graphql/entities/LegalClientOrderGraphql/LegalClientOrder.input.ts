import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { type ILegalClientOrder } from 'domain/entities/legalClientEntities/LegalClientOrder/LegaClientOrder';

@InputType()
export class LegalClientOrderInput
  implements Omit<ILegalClientOrder, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  order: string;
  @Field()
  legal_contract_id: string;
  @HideField()
  created_by: string;
  @HideField()
  updated_by: string;
}
@InputType()
export class LegalClientOrderUpdateInput extends PartialType(
  LegalClientOrderInput,
) {}
