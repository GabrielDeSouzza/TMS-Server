import { Field, ObjectType } from '@nestjs/graphql';

import { type IRouteLegalClient } from 'domain/entities/OrdersAndRoutesEntities/routeLegalClient/RouteLegalClient';

import { OrderProcessingLegalClientModel } from '../OrderProcessingLegalClientGraphql/OrderProcessingLegalClient.model';

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
  order_processing_id: string;
  @Field()
  city: string;
  @Field()
  uf: string;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => OrderProcessingLegalClientModel)
  OrderProcessing: OrderProcessingLegalClientModel;
}
