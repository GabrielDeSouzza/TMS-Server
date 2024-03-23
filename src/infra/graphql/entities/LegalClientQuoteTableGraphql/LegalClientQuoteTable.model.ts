import { Field, ObjectType } from '@nestjs/graphql';

import { type ILegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

import { RecipientModel } from '../RecipientGraphql/Recipient.model';
import { SenderModel } from '../SenderGraphql/Sender.model';

@ObjectType()
export class LegalClientQuoteTableModel implements ILegalClientQuoteTable {
  @Field()
  id?: string;
  @Field()
  codQuote: string;
  @Field()
  recipientId: string;
  @Field()
  senderId: string;
  @Field()
  who_pays: string;
  @Field()
  postalCodOrigin: string;
  @Field()
  postalCodDestiny: string;
  @Field()
  typeMerchandise: string;
  @Field()
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
}
