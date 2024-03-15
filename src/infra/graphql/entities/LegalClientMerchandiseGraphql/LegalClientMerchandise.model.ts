import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { type ILegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';

import { InvoiceForLegalClientModel } from '../InvoiceForLegalClientGraphql/InvoiceForLegalClient.model';
import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';

@ObjectType()
export class LegalClientMerchandiseModel implements ILegalClientMerchandise {
  @Field()
  legal_client_order_id: string;
  @Field()
  invoice_legal_client: string;
  @Field()
  id: string;
  @Field()
  codMerchandise: string;
  @Field(() => Int)
  amount: number;
  @Field()
  description: string;
  @Field(() => Float)
  mass: number;
  @Field(() => Float)
  volume: number;
  @Field(() => Float)
  value: number;
  @Field(() => LegalClientOrderModel)
  LegalClientOrder: LegalClientOrderModel;
  @Field(() => InvoiceForLegalClientModel)
  Invoice: InvoiceForLegalClientModel;
}
