import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { type ILegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

@InputType()
export class LegalClientOrderInput
  implements Omit<ILegalClientOrder, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  recipient_id: string;
  @HideField()
  @Allow()
  order: string;
  @Field()
  @IsUUID()
  @IsNotEmpty()
  legal_contract_id: string;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}
@InputType()
export class LegalClientOrderUpdateInput extends PartialType(
  LegalClientOrderInput,
) {}
