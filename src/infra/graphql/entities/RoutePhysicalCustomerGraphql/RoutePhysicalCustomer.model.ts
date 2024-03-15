import { Field, ObjectType } from '@nestjs/graphql';

import { type IRoutePhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/routePhysicalCustomer/RoutePhysicalCustomer';

@ObjectType()
export abstract class RoutePhysicalCustomerModel
  implements IRoutePhysicalCustomer
{
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
}
