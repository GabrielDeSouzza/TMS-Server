import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { type ILegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';

@InputType()
export class LegalContractInput
  implements Omit<ILegalContract, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  contract_number: string;
  @Field()
  legal_client_id: string;
  @Field()
  carrier_company_id: string;
  @Field({ nullable: true })
  observations?: string;
  @Field()
  effective_date: Date;
  @Field()
  delivery_conditions: string;
  @HideField()
  updated_by: string;
  @HideField()
  created_by?: string;
}
@InputType()
export class LegalContractUpdateInput extends PartialType(LegalContractInput) {}
