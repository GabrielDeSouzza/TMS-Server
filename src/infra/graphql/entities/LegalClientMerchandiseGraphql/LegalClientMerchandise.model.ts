import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { type ILegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';

@ObjectType()
export class LegalClientMerchandiseModel implements ILegalClientMerchandise {
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
  @Field()
  legalClientOrderId: string;
  @Field(() => LegalClientOrderModel)
  LegalClientOrder: LegalClientOrderModel;
}
