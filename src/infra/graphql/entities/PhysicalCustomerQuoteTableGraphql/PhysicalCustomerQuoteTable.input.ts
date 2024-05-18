import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import {
  Allow,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

import { type IPhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

import { AdressInput } from '../AdressesGraphql/Adresses.input';

@InputType()
export class PhysicalCustomerQuoteTableInput
  implements
    Omit<IPhysicalCustomerQuoteTable, 'id' | 'created_at' | 'updated_at'>
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
  @Field(() => AdressInput)
  @IsObject()
  @IsNotEmpty()
  adressOrigin: AdressInput;
  @Field(() => AdressInput)
  @IsObject()
  @IsNotEmpty()
  adressDestiny: AdressInput;
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
export class PhysicalCustomerQuoteTableUpdate extends PartialType(
  OmitType(PhysicalCustomerQuoteTableInput, ['codQuote', 'created_by']),
) {
  updated_by: string;
}
