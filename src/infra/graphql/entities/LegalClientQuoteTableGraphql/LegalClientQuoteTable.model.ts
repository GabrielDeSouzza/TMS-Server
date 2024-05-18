import { Field, Int, ObjectType } from '@nestjs/graphql';

import { type ILegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

import { AdressModel } from '../AdressesGraphql/Adresses.model';
import { IcmsModel } from '../IcmsGraphql/Icms.model';
import { RecipientModel } from '../RecipientGraphql/Recipient.model';
import { SenderModel } from '../SenderGraphql/Sender.model';

@ObjectType()
export class LegalClientQuoteTableModel implements ILegalClientQuoteTable {
  @Field()
  id: string;
  @Field()
  kindService: string;
  @Field()
  @Field()
  typeCte: string;
  @Field()
  natureService: string;
  @Field()
  formPayment: string;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => AdressModel)
  adressOrigin: AdressModel;
  @Field(() => AdressModel)
  adressDestiny: AdressModel;
  @Field()
  codQuote: string;
  @Field()
  recipientId: string;
  @Field()
  senderId: string;
  @Field()
  who_pays: string;
  @Field()
  typeMerchandise: string;
  @Field(() => Int)
  amount: number;
  @Field()
  description: string;
  @Field()
  mass: number;
  @Field()
  volume: number;
  @Field()
  nf_value: number;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => RecipientModel)
  Recipient: RecipientModel;
  @Field(() => SenderModel)
  Sender: SenderModel;
  @Field()
  icms_id?: string;
  @Field(() => IcmsModel)
  Icms: IcmsModel;
}
