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

import { formPaymentEnum } from 'infra/graphql/enums/FormPayment.enum';
import { kindOfServicerOrderEnum } from 'infra/graphql/enums/KindOfServiceOrder.enum';
import { typeMerchandiseEnum } from 'infra/graphql/enums/TypesMerchandise.enum';
import { whoIsPayEmum } from 'infra/graphql/enums/WhoIsPay.enum';

import { AdressInput } from '../AdressesGraphql/Adresses.input';

@InputType()
export class LegalClientQuoteTableInput
  implements Omit<ILegalClientQuoteTable, 'id' | 'created_at' | 'updated_at'>
{
  @Field(() => kindOfServicerOrderEnum)
  @IsNotEmpty()
  @IsString()
  kindService: kindOfServicerOrderEnum;
  @Field(() => formPaymentEnum)
  @IsNotEmpty()
  @IsString()
  formPayment: formPaymentEnum;
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
  @Field(() => whoIsPayEmum)
  @IsString()
  @IsNotEmpty()
  who_pays: whoIsPayEmum;

  @Field(() => typeMerchandiseEnum)
  @IsString()
  @IsNotEmpty()
  typeMerchandise: typeMerchandiseEnum;
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
  @Field()
  @IsNotEmpty()
  nf_number: string;
  @Field()
  @IsNotEmpty()
  nf_serie: string;
  @Allow()
  digital_signature: string;
}

@InputType()
export class LegalClientQuoteTableUpdate extends PartialType(
  OmitType(LegalClientQuoteTableInput, [
    'codQuote',
    'created_by',
    'digital_signature',
  ]),
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
