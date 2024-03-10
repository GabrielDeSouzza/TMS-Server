import { Field, ObjectType } from '@nestjs/graphql';

import { type IRouteLegalClient } from 'domain/entities/OrdersAndRoutesEntities/routeLegalClient/RouteLegalClient';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';

@ObjectType()
export abstract class RouteLegalClientModel implements IRouteLegalClient {
  @Field()
  id: string;
  @Field()
  cep: string;
  @Field()
  public_place: string;
  @Field()
  address_number: string;
  @Field()
  neighborhood: string;
  @Field({ nullable: true })
  complement?: string;
  @Field()
  legalClientOrderId: string;
  @Field()
  city: string;
  @Field()
  uf: string;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => LegalClientOrderModel)
  LegalClientOrder: LegalClientOrderModel;
}
