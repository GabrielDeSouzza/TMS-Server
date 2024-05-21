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

import { formPaymentEnum } from 'infra/graphql/enums/FormPayment.enum';
import { kindOfServicerOrderEnum } from 'infra/graphql/enums/KindOfServiceOrder.enum';
import { typeMerchandiseEnum } from 'infra/graphql/enums/TypesMerchandise.enum';
import { whoIsPayEmum } from 'infra/graphql/enums/WhoIsPay.enum';

import { AdressInput } from '../AdressesGraphql/Adresses.input';

@InputType()
export class PhysicalCustomerQuoteTableInput
  implements
    Omit<IPhysicalCustomerQuoteTable, 'id' | 'created_at' | 'updated_at'>
{
  @Field(() => kindOfServicerOrderEnum)
  @IsNotEmpty()
  @IsString()
  kindService: kindOfServicerOrderEnum;
  @Field(() => formPaymentEnum)
  @IsNotEmpty()
  @IsString()
  formPayment: formPaymentEnum;
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
  @Field(() => AdressInput)
  @IsObject()
  @IsNotEmpty()
  adressOrigin: AdressInput;
  @Field(() => AdressInput)
  @IsObject()
  @IsNotEmpty()
  adressDestiny: AdressInput;
  @Field(() => typeMerchandiseEnum)
  @IsString()
  @IsNotEmpty()
  typeMerchandise: typeMerchandiseEnum;
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
