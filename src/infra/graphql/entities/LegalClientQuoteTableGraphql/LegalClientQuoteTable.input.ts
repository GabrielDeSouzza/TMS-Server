import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { type ILegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

@InputType()
export class LegalClientQuoteTableInput
  implements Omit<ILegalClientQuoteTable, 'id' | 'created_at' | 'updated_at'>
{
  @HideField()
  @Allow()
  codQuote: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  recipientId: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  senderId: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  who_pays: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  postalCodOrigin: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  postalCodDestiny: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  typeMerchandise: string;
  @Field()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;
  @Field()
  @IsNumber()
  @IsNotEmpty()
  mass: number;
  @Field()
  @IsNumber()
  @IsNotEmpty()
  volume: number;
  @Field()
  @IsNumber()
  @IsNotEmpty()
  nf_value: number;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}

@InputType()
export class LegalClientQuoteTableUpdate extends PartialType(
  OmitType(LegalClientQuoteTableInput, ['codQuote', 'created_by']),
) {
  updated_by: string;
}
