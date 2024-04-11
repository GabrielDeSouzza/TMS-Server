import { Field, ObjectType } from '@nestjs/graphql';

import { type IIncident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';

import { OrderProcessingModel } from '../OrderProcessingGraphql/OrderProcessing.model';

@ObjectType()
export class IncidentModel implements IIncident {
  @Field()
  id?: string;
  @Field()
  description: string;
  @Field(() => Date)
  date_incident: Date;
  @Field()
  order_process_id: string;
  @Field(() => Date, { nullable: true })
  date_resolved?: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => Date)
  updated_at?: Date;
  @Field(() => Date)
  created_at?: Date;
  @Field(() => OrderProcessingModel)
  OrderProcessing: OrderProcessingModel;
}
