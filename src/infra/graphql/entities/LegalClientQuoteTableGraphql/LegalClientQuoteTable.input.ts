import {
  Field,
  HideField,
  InputType,
  Int,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import {
  Allow,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

import { type ILegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

import { AdressInput } from '../AdressesGraphql/Adresses.input';

@InputType()
export class LegalClientQuoteTableInput
  implements Omit<ILegalClientQuoteTable, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsNotEmpty()
  @IsString()
  kindService: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  typeCte: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  natureService: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  formPayment: string;
  @Field(() => AdressInput)
  @IsObject()
  @IsNotEmpty()
  adressOrigin: AdressInput;
  @Field(() => AdressInput)
  @IsObject()
  @IsNotEmpty()
  adressDestiny: AdressInput;
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
  typeMerchandise: string;
  @Field(() => Int)
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

@InputType()
export class LegalClientQuoteTableUpdateManyInput extends PartialType(
  LegalClientQuoteTableInput,
) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
