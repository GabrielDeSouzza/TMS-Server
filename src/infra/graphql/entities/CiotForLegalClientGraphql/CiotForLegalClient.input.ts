import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  Allow,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

import { type ICiotForLegalClient } from 'domain/entities/LegalClientEntities/CiotForLegalPerson/CiotForLegalClient';

@InputType()
export class CiotForLegalClientInput
  implements Omit<ICiotForLegalClient, 'id' | 'created_at' | 'updated_at'>
{
  @IsString()
  @Field()
  @Length(16)
  ciot: string;

  @Type(() => Date)
  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  emission_date: Date;
  @IsUUID()
  @Field()
  @IsNotEmpty()
  legal_contract_id: string;
  @Allow()
  @HideField()
  @Allow()
  updated_by: string;
  @Allow()
  @HideField()
  @IsOptional()
  created_by?: string;
}
@InputType()
export class CiotForLegalClientUpdateInput extends PartialType(
  CiotForLegalClientInput,
) {}
